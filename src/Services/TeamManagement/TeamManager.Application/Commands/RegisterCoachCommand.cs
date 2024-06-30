using MediatR;
using TeamManagement.Core;
using TeamManagement.Core.Coach;

namespace TeamManager.UseCases.Commands
{
    public record RegisterCoachCommand(string Name) : IRequest;

    internal sealed class RegisterCoachCommandHandler : IRequestHandler<RegisterCoachCommand>
    {
        private readonly ICoachStore _coachStore;
        public RegisterCoachCommandHandler(ICoachStore coachStore) 
        {
            _coachStore = coachStore;
        }

        public async Task Handle(RegisterCoachCommand command, CancellationToken cancellationToken)
        {
            var coach = new Coach(command.Name);
            await _coachStore.Save(coach, cancellationToken);
        }
    }
}
