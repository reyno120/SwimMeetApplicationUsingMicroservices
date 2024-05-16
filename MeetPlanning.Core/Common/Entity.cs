
namespace MeetPlanning.Core.Common
{
    public abstract class Entity<T>
    {
        //private readonly List<BaseDomainEvent> _domainEvents = new List<BaseDomainEvent>();
        //public virtual IReadOnlyList<BaseDomainEvent> DomainEvents => _domainEvents;
        public T Id { get; protected set; }

        //protected virtual void AddDomainEvent(BaseDomainEvent newEvent)
        //{
        //    _domainEvents.Add(newEvent);
        //}
    }
}
