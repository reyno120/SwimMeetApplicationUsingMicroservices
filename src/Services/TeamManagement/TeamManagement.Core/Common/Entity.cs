
namespace TeamManagement.Core.Common
{
    public abstract class Entity
    {
        public Guid Id { get; protected set; }

        private readonly List<BaseDomainEvent> _domainEvents = new List<BaseDomainEvent>();
        public virtual IReadOnlyList<BaseDomainEvent> DomainEvents => _domainEvents;    // TODO: Why Virtual?
        protected virtual void AddDomainEvent(BaseDomainEvent newEvent) // TODO: why virtual?
        {
            _domainEvents.Add(newEvent);
        }
    }
}
