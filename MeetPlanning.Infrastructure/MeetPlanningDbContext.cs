using MeetPlanning.Core.Meet;
using Microsoft.EntityFrameworkCore;

namespace MeetPlanning.Infrastructure
{
    public class MeetPlanningDbContext : DbContext
    {
        public MeetPlanningDbContext(DbContextOptions<MeetPlanningDbContext> options) : base(options)
        {
        }

        public DbSet<Meet> Meets { get; set; }
    }
}
