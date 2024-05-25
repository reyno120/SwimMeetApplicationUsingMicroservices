using FastEndpoints;
using FluentValidation;
using MeetPlanning.Infrastructure;

namespace MeetPlanning.API.MeetEndpoints
{
    public class GetById : Endpoint<GetMeetByIdRequest, GetMeetByIdResponse>
    {
        public MeetPlanningDbContext dbContext { get; set; }

        public override void Configure()
        {
            Get("/api/meet/{Id}");
            // TODO: Fix Swagger & add Swagger Documentation
            //Summary(s =>
            //{
            //    s.Description = "Get Meet By Id";
            //    s.Summary = "Retrieves Meet by Id";
            //});
            AllowAnonymous();   // remove this once we add auth
        }

        public override async Task HandleAsync(GetMeetByIdRequest req, CancellationToken ct)
        {
            var meet = await dbContext.Meets.FindAsync(1);
            if (meet == null)
            {
                await SendAsync(null);
                return;
            }

            var response = new GetMeetByIdResponse(meet.Name);
            await SendAsync(response);
        }
    }

    public record GetMeetByIdRequest(int Id);   // add model validation w/ fastendpoints

    sealed class GetMeetByIdRequestValidator : Validator<GetMeetByIdRequest>
    {
        public GetMeetByIdRequestValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0)
                .WithMessage("Id is required!");
        }
    }


    public record GetMeetByIdResponse(string Name);
}