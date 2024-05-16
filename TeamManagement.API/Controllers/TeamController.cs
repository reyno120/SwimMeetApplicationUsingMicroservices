using MediatR;
using Microsoft.AspNetCore.Mvc;
using TeamManager.UseCases.Queries;

namespace TeamManagement.API.Controllers
{
    public class TeamController : Controller
    {
        private readonly IMediator _mediator;

        public TeamController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        // add swagger stuff
        // add auth
        [HttpGet]
        [ActionName("{id}")]
        public async Task<ActionResult<IEnumerable<GetTeamByIdQueryResult>>> GetTeam([FromRoute] Guid id)
        {
            // webapi best practices
            var team = await _mediator.Send(new GetTeamByIdQuery(id));
            return Ok(team);
        }
    }
}
