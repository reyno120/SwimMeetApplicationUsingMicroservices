using Ardalis.GuardClauses;
using TeamManagement.Core.Coach.Entities;
using TeamManagement.Core.Coach.ESEvents;
using TeamManagement.Core.Common;

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
            AddESEvent(new CoachRegisteredESEvent(this.Id, name));
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
            AddESEvent(new TeamAddedESEvent(team.Name));
        }

        #endregion

        #region Event Sourcing

        public Coach(IEnumerable<object> events)
        {
            foreach (var @event in events)
            {
                _version++;

                switch(@event)
                {
                    case CoachRegisteredESEvent:
                        Apply((CoachRegisteredESEvent)@event);
                        break;

                    case TeamAddedESEvent:
                        Apply((TeamAddedESEvent)@event);
                        break;

                    default:
                        break;
                }
            }
        }

        private void Apply(CoachRegisteredESEvent @event)
        {
            Id = @event.Id;
            Name = @event.Name; 
        }

        private void Apply(TeamAddedESEvent @event)
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
