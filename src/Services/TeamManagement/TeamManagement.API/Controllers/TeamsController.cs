using MediatR;
using Microsoft.AspNetCore.Mvc;
using TeamManager.UseCases.Commands;
using TeamManager.UseCases.Queries;

namespace TeamManagement.API.Controllers
{
    [ApiController]
    [Route("teams")]
    public class TeamsController : Controller
    {
        private readonly IMediator _mediator;

        public TeamsController(IMediator mediator)
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

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult> AddTeam(Guid coachId, string teamName)
        {
            await _mediator.Send(new AddTeamCommand(coachId, teamName));
            return NoContent();
        }
    }
}
