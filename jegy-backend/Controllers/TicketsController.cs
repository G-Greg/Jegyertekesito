using Microsoft.AspNetCore.Mvc;
using jegy_backend.Models;
using jegy_backend.Services;

namespace jegy_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await _ticketService.getTickets();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(long id)
        {
            var ticket = await _ticketService.getTicket(id);

            if (ticket == null)
            {
                return NotFound();
            }
            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(long id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            var res = await _ticketService.putTicket(id, ticket);

            if (res == null)
            {
                return Conflict("Error during update the ticket");
            }
            else if (!_ticketService.ticketExists(res.Id))
            {
                return Conflict("This ticket is not exist");
            }

            return NoContent();
        }

        [HttpPut("buy/{id}")]
        public async Task<IActionResult> BuyTicket(long id, string[] value)
        {

            var res = await _ticketService.buyTicket(id, value);

            if (res == null)
            {
                return Conflict("Error during buy the ticket");
            }
            else if (!_ticketService.ticketExists(res.Id))
            {
                return Conflict("This ticket is not exist");
            }

            return Ok();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            await _ticketService.postTicket(ticket);
            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(long id)
        {
            var ticket = await _ticketService.deleteTicket(id);
            if (!ticket)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}
