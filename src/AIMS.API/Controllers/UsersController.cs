using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AIMS.API.Controllers {
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class UsersController : Controller {
        private readonly IUserService _userService;

        public UsersController (IUserService userService) {
            this._userService = userService;
        }

        // GET: api/users/getall
        [HttpGet ("[action]")]
        public async Task<IEnumerable<vmUser>> getall () {
            return await _userService.ListAsync ();
        }

        // GET api/users/getbyid/1
        [HttpGet ("[action]/{id}")]
        public async Task<User> getbyid (int id) {
            return await _userService.FindByIdAsync (id);
        }

        // GET api/users/getbyrfid/1
        [HttpGet ("[action]/{rfid}")]
        public async Task<User> getbyrfid (string rfid) {
            return await _userService.FindByRfidAsync (rfid);
        }

        // POST: api/users/save
        [HttpPost ("[action]")]
        public async Task<object> save ([FromBody] User user) {
            if (user.Id == 0) {
                return await _userService.SaveAsync (user);
            } else {
                return await _userService.UpdateAsync (user);
            }

        }

        // DELETE api/users/deletebyid/1
        [HttpDelete ("[action]/{id}")]
        public async Task<object> deletebyid (int id) {
            return await _userService.DeleteAsync (id);
        }
    }
}