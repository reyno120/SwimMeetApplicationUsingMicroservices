using MediatR;
using Microsoft.AspNetCore.Mvc;
using TeamManager.UseCases.Commands;

namespace TeamManagement.API.Controllers
{
    [ApiController]
    [Route("coaches")]
    public class CoachesController : Controller
    {
        private readonly IMediator _mediator;

        public CoachesController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }


        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> RegisterCoach(string name)
        {
            await _mediator.Send(new RegisterCoachCommand(name));
            return NoContent();
        }
    }
}
