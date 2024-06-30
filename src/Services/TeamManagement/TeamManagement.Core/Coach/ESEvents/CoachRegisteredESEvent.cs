using TeamManagement.Core.Common;

namespace TeamManagement.Core.Coach.ESEvents
{
    public record CoachRegisteredESEvent(Guid Id, string Name) : IESEvent;
}
