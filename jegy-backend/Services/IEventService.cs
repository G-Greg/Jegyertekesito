using jegy_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jegy_backend.Services
{
    public interface IEventService
    {

        Task<ActionResult<IEnumerable<Event>>> getEvents();
        Task<ActionResult<Event>> getEvent(long id);
        Task<Event> putEvent(long id, Event @event);
        Task postEvent(Event @event);
        Task<bool> deleteEvent(long id);
        bool eventExists(long id);

    }
}
