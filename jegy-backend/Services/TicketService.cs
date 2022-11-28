using jegy_backend.Contexts;
using jegy_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jegy_backend.Services
{
    public class TicketService : ITicketService
    {
        private readonly DatabaseContext _context;

        public TicketService(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Ticket>>> getTickets()
        {
            return await _context.Tickets.ToListAsync();
        }
        public async Task<ActionResult<Ticket>> getTicket(long id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            return ticket;
        }
        public async Task<Ticket> putTicket(long id, Ticket ticket)
        {
            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }
            return ticket;
        }
        public async Task<Ticket> buyTicket(long id, string[] value)
        {
            int amount = int.Parse(value[1]);
            Ticket ticket = _context.Tickets.Where(e => e.Id == id).First();

            if (id != ticket.Id)
            {
                return null;
            }

            if (value[0].Equals("Early Bird"))
            {
                ticket.EarlyBird = ticket.EarlyBird - amount;
            }
            else if (value[0].Equals("Last Minute"))
            {
                ticket.LastMinute = ticket.LastMinute - amount;
            }
            else if (value[0].Equals("Normal"))
            {
                ticket.Normal = ticket.Normal - amount;
            }
            else if (value[0].Equals("VIP"))
            {
                ticket.VIP = ticket.VIP - amount;
            }


            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return ticket;
        }

        public Task postTicket(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            return _context.SaveChangesAsync();
        }


        public async Task<bool> deleteTicket(long id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return false;
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return true;
        }

        public bool ticketExists(long id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }

    }
}
