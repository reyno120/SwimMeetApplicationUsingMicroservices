using Ardalis.GuardClauses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagement.Core.Common;

namespace TeamManagement.Core.Coach.Entities
{
    public class Team : Entity
    {
        public string Name { get; private set; }

        private readonly List<Guid> _swimmers = new List<Guid>();
        public IReadOnlyList<Guid> Swimmers => _swimmers.AsReadOnly();


        public Team(string name, IEnumerable<Guid> swimmers)
        {
            Id = Guid.NewGuid();
            Name = Guard.Against.NullOrEmpty(name);
            //_swimmers = Guard.Against.NullOrEmpty(swimmers).ToList(); // commented out for testing
        }

        //public void ModifyTeam(List<Guid> swimmers)
        //{
        //    if (swimmers == null || swimmers.Count() <= 0)
        //        throw new InvalidOperationException("Swimmers is Null or Empty.");

        //    if (swimmers.Any(s => s == Guid.Empty))
        //        throw new InvalidOperationException("Swimmers contains an Empty Id.");

        //    _swimmers.Clear();
        //    _swimmers.AddRange(swimmers);
        //}
    }
}
