using jegy_backend.Contexts;
using jegy_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jegy_backend.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _context;

        public UserService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<User>>> getUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<ActionResult<User>> getUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }

        public async Task<User> putUser(long id, User user)
        {
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }
            return user;
        }

        public Task postUser(User user)
        {
            _context.Users.Add(user);
            return _context.SaveChangesAsync();
        }

        public async Task<bool> deleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public bool userExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        public async Task<User> login(User user)
        {
            var res = _context.Users.Where(e => e.UserName == user.UserName).ToList().First();
            return res;

        }
        public DbSet<User> Users() {
            return _context.Users;
        }
    }
}
