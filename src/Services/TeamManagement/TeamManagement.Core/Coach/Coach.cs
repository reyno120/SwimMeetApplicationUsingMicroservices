using Ardalis.GuardClauses;
using TeamManagement.Core.Coach.Entities;
using TeamManagement.Core.Common;

namespace TeamManagement.Core.Coach
{
    public class Coach : Entity<Guid>, IAggregateRoot
    {

        private readonly List<Roster> _rosters = new List<Roster>();
        public IReadOnlyList<Roster> Rosters => _rosters.AsReadOnly();

        private readonly List<Team> _teams = new List<Team>();
        public IReadOnlyList<Team> Teams => _teams.AsReadOnly();

        // Do we need a constructor? How will EF/eventstoredb build it out?
        //public Coach()
        //{
        //}

        public void AddTeam(Team team)
        {
            Guard.Against.Null(team);
            _teams.Add(team);
        }

        //public TestEvent TestDomainEvent()
        //{
        //    var testEvent = new TestEvent("Testing event!!");
        //    AddDomainEvent(testEvent);
        //    return testEvent;
        //}
    }
}
