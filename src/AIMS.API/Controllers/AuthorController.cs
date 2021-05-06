using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AIMS.API.Controllers {
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class AuthorController : Controller {
        private readonly IAuthorService _authorService;

        public AuthorController (IAuthorService authorService) {
            this._authorService = authorService;
        }

        // GET: api/author/getall
        [HttpGet ("[action]")]
        public async Task<IEnumerable<Author>> getall () {
            return await _authorService.ListAsync ();
        }

        // GET api/author/getbyid/1
        [HttpGet ("[action]/{id}")]
        public async Task<Author> getbyid (int id) {
            return await _authorService.FindByIdAsync (id);
        }

        // POST: api/author/save
        [HttpPost ("[action]")]
        public async Task<object> save ([FromBody] Author author) {
            if (author.Id == 0) {
                return await _authorService.SaveAsync (author);
            } else {
                return await _authorService.UpdateAsync (author);
            }
        }

        // DELETE api/author/deletebyid/1
        [HttpDelete ("[action]/{id}")]
        public async Task<object> deletebyid (int id) {
            return await _authorService.DeleteAsync (id);
        }
    }
}