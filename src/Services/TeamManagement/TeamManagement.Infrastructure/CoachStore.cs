using EventStore.Client;
using MediatR;
using System;
using System.Collections.Generic;
using TeamManagement.Core.Coach;

namespace TeamManagement.Infrastructure
{
    public class CoachStore : EventStore<Coach>, ICoachStore
    {
        public CoachStore(EventStoreClient client, IMediator mediator) : base(client, mediator)
        {
        }
    }
}
