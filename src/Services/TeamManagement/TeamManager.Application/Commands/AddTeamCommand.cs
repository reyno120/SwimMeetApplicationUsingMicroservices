using MediatR;
using TeamManagement.Core.Coach;

namespace TeamManager.UseCases.Commands
{
    public record AddTeamCommand(Guid CoachId, string TeamName) : IRequest;

    internal sealed class AddTeamCommandHandler : IRequestHandler<AddTeamCommand>
    {
        private readonly ICoachStore _coachStore;

        public AddTeamCommandHandler(ICoachStore coachStore)
        {
            _coachStore = coachStore;
        }

        public async Task Handle(AddTeamCommand command, CancellationToken cancellationToken)
        {
            var coach = await _coachStore.Find(command.CoachId, cancellationToken);

            coach.AddTeam(command.TeamName, new List<Guid>());

            await _coachStore.Save(coach, cancellationToken);
        }
    }
}
