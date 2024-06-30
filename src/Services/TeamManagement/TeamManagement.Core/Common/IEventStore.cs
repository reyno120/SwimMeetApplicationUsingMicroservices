namespace TeamManagement.Core.Common
{
    public interface IEventStore<TAggregate>
        where TAggregate : AggregateRoot, IAggregateRoot
    {
        Task<TAggregate?> Find(Guid id, CancellationToken cancellationToken);

        //Task Append(TId id, object @event, uint version, CancellationToken cancellationToken);

        Task Save(TAggregate aggregate, CancellationToken cancellationToken);
    }
}
