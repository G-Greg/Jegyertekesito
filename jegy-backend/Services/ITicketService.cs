using jegy_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace jegy_backend.Services
{
    public interface ITicketService
    {
        Task<ActionResult<IEnumerable<Ticket>>> getTickets();
        Task<ActionResult<Ticket>> getTicket(long id);
        Task<Ticket> putTicket(long id, Ticket ticket);
        Task<Ticket> buyTicket(long id, string[] value);
        Task postTicket(Ticket ticket);
        Task<bool> deleteTicket(long id);
        bool ticketExists(long id);

    }
}
