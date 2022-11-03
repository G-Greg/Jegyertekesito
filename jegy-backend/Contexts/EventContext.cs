using jegy_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace jegy_backend.Contexts
{
    public class EventContext : DbContext
    {

        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {

        }

        public DbSet<Event> Events { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>().ToTable("events");
        }

    }
}
