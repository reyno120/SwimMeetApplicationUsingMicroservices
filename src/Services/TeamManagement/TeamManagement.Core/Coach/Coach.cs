using Ardalis.GuardClauses;
using TeamManagement.Core.Coach.Entities;
using TeamManagement.Core.Coach.Events;
using TeamManagement.Core.Common;
using TeamManager.Core.Common;

namespace TeamManagement.Core.Coach
{
    public class Coach : AggregateRoot, IAggregateRoot
    {
        #region Members
        
        public string Name { get; set; }    
        private readonly List<Roster> _rosters = new List<Roster>();
        public IReadOnlyList<Roster> Rosters => _rosters.AsReadOnly();

        private readonly List<Team> _teams = new List<Team>();
        public IReadOnlyList<Team> Teams => _teams.AsReadOnly();

        private int _version = 0;

        #endregion



        public Coach(string name)
        {
            Id = Guid.NewGuid();
            Name = Guard.Against.NullOrEmpty(name);
            AddSourcedEvent(new CoachRegisteredEvent(this.Id, name));
        }

        #region Behaviors

        public void AddTeam(string name, List<Guid> swimmers)
        {
            var doesTeamAlreadyExist = _teams.Select(s => s.Name).Contains(name);
            // TODO: Create custom exception
            if (doesTeamAlreadyExist)
                throw new ArgumentException("Team already exists with name " + name);

            var team = new Team(name, swimmers);
            _teams.Add(team);
            AddSourcedEvent(new TeamAddedEvent(team.Name));
        }

        #endregion

        #region Event Sourcing

        public Coach(IEnumerable<object> events)
        {
            foreach (var @event in events)
            {
                _version++;
                RedirectToWhen.InvokeEventOptional(this, @event);
            }
        }

        private void When(CoachRegisteredEvent @event)
        {
            Id = @event.Id;
            Name = @event.Name; 
        }

        private void When(TeamAddedEvent @event)
        {
            var team = new Team(@event.Name, new List<Guid>());
            _teams.Add(team);
        }

        #endregion


        public IReadOnlyList<BaseDomainEvent> CollectDomainEvents()
        {
            var domainEvents = new List<BaseDomainEvent>();
            domainEvents.AddRange(DomainEvents);

            foreach (var roster in _rosters)
                domainEvents.AddRange(roster.DomainEvents);

            foreach (var team in _teams)
                domainEvents.AddRange(team.DomainEvents);

            return domainEvents.AsReadOnly();
        }

        //public TestEvent TestDomainEvent()
        //{
        //    var testEvent = new TestEvent("Testing event!!");
        //    AddDomainEvent(testEvent);
        //    return testEvent;
        //}
    }
}
