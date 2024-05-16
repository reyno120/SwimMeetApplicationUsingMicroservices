using FastEndpoints;
using MeetPlanning.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
//using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
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
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseFastEndpoints();
if (app.Environment.IsDevelopment())
{
    //app.UseSwaggerGen();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.Run();




