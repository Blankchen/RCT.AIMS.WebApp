using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AIMS.API.Controllers {
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class DropdownController : Controller {
        private readonly IAuthorService _authorService;
        private readonly ICategoryService _categoryService;

        public DropdownController (IAuthorService authorService, ICategoryService categoryService) {
            this._authorService = authorService;
            this._categoryService = categoryService;
        }

        // GET: api/dropdown/getallauthor
        [HttpGet ("[action]")]
        public async Task<IEnumerable<Author>> getallauthor () {
            return await _authorService.ListAsync ();
        }

        // GET: api/dropdown/getallcategory
        [HttpGet ("[action]")]
        public async Task<IEnumerable<Category>> getallcategory () {
            return await _categoryService.ListAsync ();
        }
    }
}