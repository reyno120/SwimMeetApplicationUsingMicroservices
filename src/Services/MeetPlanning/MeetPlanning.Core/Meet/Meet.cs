using Ardalis.GuardClauses;
using MeetPlanning.Core.Common;

namespace MeetPlanning.Core.Meet
{
    public class Meet : Entity<int>, IAggregateRoot
    {
        public string Name { get; private set; }

        public Meet(string name)
        {
            Name = Guard.Against.NullOrEmpty(name);
        }   
    }
}
