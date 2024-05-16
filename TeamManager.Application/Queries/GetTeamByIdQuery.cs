using MediatR;


namespace TeamManager.UseCases.Queries
{
    public record GetTeamByIdQuery(Guid id) : IRequest<GetTeamByIdQueryResult>;

    internal sealed class GetTeamByIdQueryHandler : IRequestHandler<GetTeamByIdQuery, GetTeamByIdQueryResult>
    {
        public async Task<GetTeamByIdQueryResult> Handle(GetTeamByIdQuery query, CancellationToken cancellationToken)
        {
            if (query.id == Guid.Empty)
                return new GetTeamByIdQueryResult(null, new List<GetTeamByIdQueryResult_Swimmer>());

            var swimmers = new List<GetTeamByIdQueryResult_Swimmer>();
            if (query.id == Guid.Parse("22974f5f-d8a8-47e8-bbc1-3bb7cdf7db3f"))
            {
                swimmers.AddRange(
                    new List<GetTeamByIdQueryResult_Swimmer>() {
                    new GetTeamByIdQueryResult_Swimmer
                    (
                        Guid.NewGuid(),
                        "Test First Name 1",
                        "Test Last Name 1",
                        0,
                        "Male"
                    ),
                    new GetTeamByIdQueryResult_Swimmer
                    (
                        Guid.NewGuid(),
                        "Test First Name 2",
                        "Test Last Name 2",
                        1,
                        "Female"
                    ),
                    new GetTeamByIdQueryResult_Swimmer
                    (
                        Guid.NewGuid(),
                        "Test First Name 3",
                        "Test Last Name 3",
                        2,
                        "Male"
                    ),
                    new GetTeamByIdQueryResult_Swimmer
                    (
                        Guid.NewGuid(),
                        "Test First Name 4",
                        "Test Last Name 4",
                        3,
                        "Female"
                    ),
                    new GetTeamByIdQueryResult_Swimmer
                    (
                        Guid.NewGuid(),
                        "Test First Name 5",
                        "Test Last Name 5",
                        4,
                        "Male"
                    )
                    }
                 );

                return new GetTeamByIdQueryResult("Team 1", swimmers);
            }

            return new GetTeamByIdQueryResult(null, new List<GetTeamByIdQueryResult_Swimmer>()); ;
        }
    }

    public record GetTeamByIdQueryResult(string Name, List<GetTeamByIdQueryResult_Swimmer> Swimmers);
    public record GetTeamByIdQueryResult_Swimmer(Guid Id, string FirstName, string LastName, short Grade, string Gender);
}
