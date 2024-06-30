

namespace TeamManagement.Core.Common
{
    public interface IAggregateRoot
    {
        // Would it be better to place the responsibility of gathering the domain events on the aggregate
        // or use reflection to dig through all child entities during the saving of events on the infrastructure side?
        IReadOnlyList<BaseDomainEvent> CollectDomainEvents();
    }
}
