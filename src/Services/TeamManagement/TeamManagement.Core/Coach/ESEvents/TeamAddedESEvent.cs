using TeamManagement.Core.Common;

namespace TeamManagement.Core.Coach.ESEvents
{
    public record TeamAddedESEvent(string Name) : IESEvent;
}
