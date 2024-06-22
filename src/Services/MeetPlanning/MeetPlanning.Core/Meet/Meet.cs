using Ardalis.GuardClauses;
using MeetPlanning.Core.Common;
using MeetPlanning.Core.Meet.Entities;

namespace MeetPlanning.Core.Meet
{
    public class Meet : Entity<int>, IAggregateRoot
    {
        public string Name { get; private set; }
        public Address Address { get; private set; }
        public DateTime DateTime { get; private set; }
        public short MaxNumberOfIndividualEventsPerSwimmer { get; private set; }
        public short MaxNumberOfRelayEventsPerSwimmer { get; private set; }

        private readonly List<EventRule> _eventRules = new List<EventRule>();
        public IEnumerable<EventRule> EventRules => _eventRules.AsReadOnly();

        public Meet(string name,
            Address address,
            DateTime dateTime,
            List<EventRule> eventRules,
            short maxNumberOfIndividualEventsPerSwimmer,
            short maxNumberOfRelaysEventsPerSwimmer)
        {
            Guard.Against.OutOfRange(name.Length, name, 1, 50);
            Guard.Against.OutOfSQLDateRange(dateTime);
            Guard.Against.OutOfRange(dateTime, nameof(dateTime), DateTime.Now, DateTime.MaxValue, "Meet Date is in the past.");
            Guard.Against.Null(eventRules);

            Name = name;
            Address = address;
            DateTime = dateTime;
            _eventRules = eventRules;
            MaxNumberOfIndividualEventsPerSwimmer =
                (short)Guard.Against.NegativeOrZero(maxNumberOfIndividualEventsPerSwimmer);
            MaxNumberOfRelayEventsPerSwimmer =
                (short)Guard.Against.NegativeOrZero(maxNumberOfRelaysEventsPerSwimmer);
        }

        public void ChangeDateTime(DateTime dateTime)
        {
            Guard.Against.OutOfSQLDateRange(dateTime);
            Guard.Against.OutOfRange(dateTime, nameof(dateTime), DateTime.Now, DateTime.MaxValue, "Meet Date is in the past.");

            DateTime = dateTime;
            // Broadcast change to teams
        }

        public void ChangeLocation(Address address)
        {
            Address = Guard.Against.Null(address);
            // Broadcast change to teams
        }
    }
}
