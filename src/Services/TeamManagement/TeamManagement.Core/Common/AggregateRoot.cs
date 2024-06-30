
namespace TeamManagement.Core.Common
{
    public abstract class AggregateRoot : Entity
    {
        private readonly List<object> _uncommittedEvents = new List<object>();
        public virtual IReadOnlyList<object> UncommitedEvents => _uncommittedEvents;

        protected virtual void AddSourcedEvent(object newEvent) // TODO: Virtual?
        {
            _uncommittedEvents.Add(newEvent);
        }
    }
}
 