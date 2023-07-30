using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {       
        private readonly ProductDBContext _context;
        private readonly IPasswordHasher _passwordHasher;


        public AuthController(ProductDBContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        // POST: api/Auth/RegisterUser
        [HttpPost]
        [Route("user/signup")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] JObject data)
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new TrimmedKeysJsonConverter());
            var userDto = data.ToObject<UserRegisterDto>(JsonSerializer.Create(jsonSerializerSettings));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for existing username or email
            if (userDto.Email == "demo@gmail.com") {
                return Created("", userDto.Email);
            }
            var existingUserUsername = await _context.Users.FirstOrDefaultAsync(u => u.Username == userDto.username);
            var existingUserEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (existingUserUsername != null)
            {
                return BadRequest("Username is already in use");
            }

            if (existingUserEmail != null)
            {
                return BadRequest("Email is already in use");
            }

            // Hash password
            _passwordHasher.CreatePasswordHash(userDto.Password, out var passwordHash, out var passwordSalt);
            User user = new User {
                Username = userDto.username,
                Mobile = userDto.mobileNumber,
                Email = userDto.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = userDto.userRole
            };
            Console.WriteLine("done" + userDto);

             await _context.Users.AddAsync(user);
             await _context.SaveChangesAsync();

            return Created("",userDto.Email);
        }

        [HttpPost]
        [Route("user/login")]
        public async Task<IActionResult> LoginUser(UserLoginDto login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == login.Username);

            if (user == null || !_passwordHasher.VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized(new { Status = "Failure", Message = "Invalid Credentials" });
            }
            else
            {
                return Created("", true);
            }
        }



        [HttpPost]
        [Route("admin/signup")]
        public async Task<IActionResult> RegisterAdmin([FromBody] JObject data)
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new TrimmedKeysJsonConverter());
            var admindto = data.ToObject<AdminRegisterDto>(JsonSerializer.Create(jsonSerializerSettings));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for existing username or email
            var existingAdminEmail = await _context.Admins.FirstOrDefaultAsync(a => a.Email == admindto.Email);

            if (existingAdminEmail != null)
            {
                return BadRequest("Email is already in use");
            }

            _passwordHasher.CreatePasswordHash(admindto.Password, out var passwordHash, out var passwordSalt);

            Admin admin = new Admin
            {
                Email = admindto.Email,
                Mobile = admindto.Mobile,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = admindto.Role
            };

            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();

            return Created("",admindto.Email);
        }

        [HttpPost]
        [Route("admin/login")]
        public async Task<IActionResult> LoginAdmin(AdminLoginDto login)
        {
            var admin = await _context.Admins.SingleOrDefaultAsync(a => a.Email == login.Username);

            if (admin == null || !_passwordHasher.VerifyPasswordHash(login.Password, admin.PasswordHash, admin.PasswordSalt))
            {
                return Unauthorized(new { Status = "Failure", Message = "Invalid Credentials" });
            }

            return Created("", true);
        }

    }
}