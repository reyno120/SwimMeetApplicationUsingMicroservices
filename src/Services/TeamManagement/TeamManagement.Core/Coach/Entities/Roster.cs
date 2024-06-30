using Ardalis.GuardClauses;
using TeamManagement.Core.Common;

namespace TeamManagement.Core.Coach.Entities
{
    public class Roster : Entity
    {
        public string Name { get; private set; }
        public int MeetId { get; private set; }

        private readonly List<Guid> _swimmers = new List<Guid>();
        public IReadOnlyList<Guid> Swimmers => _swimmers.AsReadOnly();


        public Roster(string name, int meetId, IEnumerable<Guid> swimmers)
        {
            Name = Guard.Against.NullOrEmpty(name);
            MeetId = Guard.Against.NegativeOrZero(meetId);
            _swimmers = Guard.Against.NullOrEmpty(swimmers).ToList();
        }
    }
}
