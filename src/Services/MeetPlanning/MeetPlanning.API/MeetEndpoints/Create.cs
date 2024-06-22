using FastEndpoints;
using MassTransit;
using MeetPlanning.API.IntegrationEvents.Events;
using MeetPlanning.Core.Enums;
using MeetPlanning.Core.Meet;
using MeetPlanning.Core.Meet.Entities;
using MeetPlanning.Infrastructure;

namespace MeetPlanning.API.MeetEndpoints
{
    public class Create : Endpoint<CreateMeetRequest>
    {
        public MeetPlanningDbContext _dbContext { get; set; }
        public IPublishEndpoint _publishEndpoint { get; set; }

        public override void Configure()
        {
            Get("/api/v1/meets/{Id}");
            // TODO: Fix Swagger & add Swagger Documentation
            //Summary(s =>
            //{
            //    s.Description = "Get Meet By Id";
            //    s.Summary = "Retrieves Meet by Id";
            //});
            AllowAnonymous();   // remove this once we add auth
        }

        public override async Task HandleAsync(CreateMeetRequest request, CancellationToken ct)
        {
            var address = new Address(request.Address.AddressLine1, request.Address.AddressLine2,
            request.Address.City, request.Address.State, request.Address.ZipCode);

            var eventRules = request.EventRules
            .Select(s =>
            {
                return new EventRule((EventType)s.EventType, s.MaxNumberOfEntriesPerTeam);
            }).ToList();

            var meet = new Meet(request.Name, address, request.DateTime,
                eventRules, request.MaxNumberOfIndividualEventsPerSwimmer,
                request.MaxNumberOfRelayEventsPerSwimmer);

            _dbContext.Meets.Add(meet);
            await _dbContext.SaveChangesAsync();

            await _publishEndpoint.Publish<MeetCreatedIntegrationEvent>(new(meet.Name, request.CoachesToInvite));
            // return no content status code
        }
    }

    public record CreateMeetRequest
    {
        public string Name { get; init; }
        public DateTime DateTime { get; init; }
        public MeetAddress Address { get; init; }
        public short MaxNumberOfIndividualEventsPerSwimmer { get; init; }
        public short MaxNumberOfRelayEventsPerSwimmer { get; init; }
        public List<EventRule> EventRules { get; init; }
        public List<Guid> CoachesToInvite { get; init; }

        public record EventRule(int EventType, short MaxNumberOfEntriesPerTeam);
        public record MeetAddress(string AddressLine1, string AddressLine2, string City, string State, string ZipCode);

        public CreateMeetRequest(string name, DateTime dateTime, MeetAddress address,
            short maxNumberOfIndividualEventsPerSwimmer, short maxNumberOfRelayEventsPerSwimmer,
            List<EventRule> eventRules, List<Guid> coachesToInvite)
        {
            Name = name;
            DateTime = dateTime;
            Address = address;
            MaxNumberOfIndividualEventsPerSwimmer = maxNumberOfIndividualEventsPerSwimmer;
            MaxNumberOfRelayEventsPerSwimmer = maxNumberOfRelayEventsPerSwimmer;
            EventRules = eventRules;
            CoachesToInvite = coachesToInvite;
        }
    }
}
