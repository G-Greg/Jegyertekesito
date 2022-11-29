using Microsoft.AspNetCore.Mvc;
using jegy_backend.Models;
using jegy_backend.Services;

namespace jegy_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _eventService.getEvents();
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(long id)
        {
            var @event = await _eventService.getEvent(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(long id, Event @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            var res = await _eventService.putEvent(id, @event);

            if (res == null)
            {
                return Conflict("Error during update the event");
            }
            else if (!_eventService.eventExists(res.Id))
            {
                return Conflict("This event is not exist");
            }

            return NoContent();
        }

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            await _eventService.postEvent(@event);
            return CreatedAtAction("GetEvent", new { id = @event.Id }, @event);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(long id)
        {
            var @event = await _eventService.deleteEvent(id);
            if (!@event)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
