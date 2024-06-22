using Ardalis.GuardClauses;
using MeetPlanning.Core.Common;
using MeetPlanning.Core.Enums;

namespace MeetPlanning.Core.Meet.Entities
{
    public class EventRule : ValueObject
    {
        public EventType EventType { get; private set; }
        public short MaxNumberOfEntriesPerTeam { get; private set; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return EventType;
            yield return MaxNumberOfEntriesPerTeam;
        }

        public EventRule(EventType eventType, short maxNumberOfAllowedEntriesPerSchool)
        {
            EventType = Guard.Against.EnumOutOfRange(eventType, nameof(eventType));
            MaxNumberOfEntriesPerTeam = (short)Guard.Against.Negative(maxNumberOfAllowedEntriesPerSchool);
        }
    }
}
