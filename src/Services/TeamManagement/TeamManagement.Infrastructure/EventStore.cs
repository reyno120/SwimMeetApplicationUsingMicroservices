using EventStore.Client;
using MediatR;
using Newtonsoft.Json;
using System.Text;
using TeamManagement.Core.Common;

namespace TeamManagement.Infrastructure
{
    public class EventStore<TAggregate> : IEventStore<TAggregate>
        where TAggregate : AggregateRoot, IAggregateRoot
    {
        private static Dictionary<string, Type> _esEventTypes = GetESEventTypes();

        private readonly EventStoreClient _eventStoreClient;
        private readonly IMediator _mediator;

        public EventStore(EventStoreClient eventStoreClient, IMediator mediator)
        {
            _eventStoreClient = eventStoreClient;
            _mediator = mediator;
        }


        public async Task<TAggregate?> Find(Guid id, CancellationToken cancellationToken)
        {
            var readResult = await _eventStoreClient.ReadStreamAsync(
                Direction.Forwards,
                $"{typeof(TAggregate).Name}-{id}",
                StreamPosition.Start,
                cancellationToken: cancellationToken
            ).ToListAsync();


            var events = new List<object>();
            foreach (var result in readResult)
            {
                var type = _esEventTypes[result.Event.EventType];

                var stringValue = Encoding.UTF8.GetString(result.Event.Data.ToArray());
                var data = JsonConvert.DeserializeObject(stringValue, type);

                events.Add(data);
            }


            return (TAggregate)Activator.CreateInstance(typeof(TAggregate), events);
        }


        public async Task Save(TAggregate aggregate, CancellationToken cancellationToken)
        {
            var eventDatas = new List<EventData>();

            foreach (var @event in aggregate.UncommitedEvents)
            {
                eventDatas.Add(new EventData(
                    eventId: Uuid.NewUuid(),
                    type: @event.GetType().Name,
                    data: System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(@event)
                    )
                );
            }

            await _eventStoreClient.AppendToStreamAsync(
            streamName: $"{typeof(TAggregate).Name}-{aggregate.Id}",
            StreamState.Any,
            eventDatas,
            cancellationToken: cancellationToken);


            // TODO: By publishing domain events AFTER we save to our event store
            // we have to embrace eventual consistency.
            // What do we do in the case of failures, how do we roll back?
            // See section "Single transaction across aggregates versus eventual consistency across aggregates"
            // https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation

            //var domainEvents = CollectDomainEvents(); // Should the gathering of domain events belong to the domain or infrasctructure?
            var domainEvents = aggregate.CollectDomainEvents();
            foreach(var domainEvent in domainEvents)
                await _mediator.Publish(domainEvent);
        }

        //private IReadOnlyList<BaseDomainEvent> CollectDomainEvents()
        //{
        //    // Use reflection to collect domain events off of each entity
        //    // within the aggregate
        //}

        private static Dictionary<string, Type> GetESEventTypes()
        {
            // Gets dictionary of Class Names -> Type for faster lookup
            return AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(IESEvent).IsAssignableFrom(p))
                .ToDictionary(x => x.Name, x => x);

        }
    }
}
