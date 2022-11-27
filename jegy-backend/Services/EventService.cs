using jegy_backend.Contexts;
using jegy_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jegy_backend.Services
{
    public class EventService : IEventService
    {
        private readonly DatabaseContext _context;

        public EventService(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Event>>> getEvents()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<ActionResult<Event>> getEvent(long id)
        {
            var @event = await _context.Events.FindAsync(id);
            return @event;
        }
        public async Task<Event> putEvent(long id, Event @event)
        {
            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }
            return @event;
        }

        public Task postEvent(Event @event)
        {
            _context.Events.Add(@event);
            return _context.SaveChangesAsync();
        }

        public async Task<bool> deleteEvent(long id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return false;
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return true;
        }

        public bool eventExists(long id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
