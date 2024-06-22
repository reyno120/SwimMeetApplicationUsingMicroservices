using MassTransit;

namespace MeetPlanning.API.IntegrationEvents.Events
{
    [EntityName("meet-created")]
    [MessageUrn("meet-created")]
    public record MeetCreatedIntegrationEvent(string Name, List<Guid> CoachesToInvite);
}
