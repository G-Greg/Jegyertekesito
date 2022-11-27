using jegy_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jegy_backend.Services
{
    public interface IUserService
    {
        Task<ActionResult<IEnumerable<User>>> getUsers();
        Task<ActionResult<User>> getUser(long id);
        Task<User?> putUser(long id, User user);
        Task postUser(User user);
        Task<bool> deleteUser(long id);
        bool userExists(long id);
        Task<User> login(User data);
        DbSet<User> Users();

    }
}
