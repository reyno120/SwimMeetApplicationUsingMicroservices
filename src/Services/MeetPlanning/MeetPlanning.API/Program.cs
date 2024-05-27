using FastEndpoints;
using MeetPlanning.Infrastructure;
using Microsoft.EntityFrameworkCore;
//using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddFastEndpoints().AddSwaggerDocument();
//builder.Services.SwaggerDocument(o =>
//{
//    o.DocumentSettings = s =>
//    {
//        s.Title = "Meet Planning";
//        s.Version = "v1";
//    };
//});

builder.Services.AddDbContext<MeetPlanningDbContext>(options =>
                //https://learn.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), 
                    providerOptions => providerOptions.EnableRetryOnFailure()));

var app = builder.Build();


// Note: Not idea for production environment
// See section "Applying Migrations at Runtime"
// https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying?tabs=dotnet-core-cli
using (var scope = app.Services.CreateScope())
{
    scope.Resolve<MeetPlanningDbContext>().Database.Migrate();
}


// Configure the HTTP request pipeline.
app.UseFastEndpoints();
if (app.Environment.IsDevelopment())
{
    //app.UseSwaggerGen();
}


//app.UseHttpsRedirection();

app.UseAuthorization();

app.Run();



