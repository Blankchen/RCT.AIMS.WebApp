using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AIMS.API.Controllers {
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class CategoryController : Controller {
        private ICategoryService _categoryService = null;

        public CategoryController (ICategoryService categoryService) {
            this._categoryService = categoryService;
        }

        // GET: api/category/getall
        [HttpGet ("[action]")]
        public async Task<IEnumerable<Category>> getall () {
            return await _categoryService.ListAsync ();
        }

        // GET api/category/getbyid/1
        [HttpGet ("[action]/{id}")]
        public async Task<Category> getbyid (int id) {
            return await _categoryService.FindByIdAsync (id);
        }

        // POST: api/category/save
        [HttpPost ("[action]")]
        public async Task<object> save ([FromBody] Category category) {
            if (category.Id == 0) {
                return await _categoryService.SaveAsync (category);
            } else {
                return await _categoryService.UpdateAsync (category);
            }

        }

        // DELETE api/category/deletebyid/1
        [HttpDelete ("[action]/{id}")]
        public async Task<object> deletebyid (int id) {
            return await _categoryService.DeleteAsync (id);
        }
    }
}