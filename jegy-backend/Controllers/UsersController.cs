using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using jegy_backend.Contexts;
using jegy_backend.Models;
using jegy_backend.Services;

namespace jegy_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {

            _userService = userService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userService.getUsers();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _userService.getUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var res = await _userService.putUser(id, user);

            if (res == null)
            {

                return Conflict("Error during update the user");
            }
            else if (!_userService.userExists(res.Id))
            {
                return Conflict("This user is not exist");
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            foreach (var user1 in _userService.Users())
            {
                if (user.UserName == user1.UserName)
                {
                    return Conflict("This username is already taken");
                }
                if (user.Email == user1.Email)
                {
                    return Conflict("This email is already registered");
                }
            }

            await _userService.postUser(user);

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var res = await _userService.deleteUser(id);
            if (res == null)
            {
                return NotFound();
            }

            return Ok();
        }


        // GET: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            try
            {
                var result = _userService.login(user).Result;

                if (result.Password != user.Password)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
