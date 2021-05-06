using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Persistence.Contexts;
using AIMS.API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace AIMS.API.Persistence.Repositories {
    public class CategoryRepository : BaseRepository, ICategoryRepository {
        public CategoryRepository (AppDbContext context) : base (context) { }

        public async Task<IEnumerable<Category>> ListAsync () {
            return await _context.Category.ToListAsync ();
        }

        public async Task<Category> FindByIdAsync (int id) {
            return await _context.Category.FirstOrDefaultAsync (x => x.Id == id);
        }

        public async Task AddAsync (Category category) {
            var maxId = _context.Category.DefaultIfEmpty ().Max (x => x == null ? 0 : x.Id) + 1;
            var categoryModel = new Category {
                Id = maxId,
                Categoryname = category.Categoryname
            };
            await _context.Category.AddAsync (categoryModel);
        }

        public async Task Update (Category category) {
            var existingCategory = await FindByIdAsync (category.Id);
            if (existingCategory == null) throw new Exception ("Category Id not exist");
            existingCategory.Categoryname = category.Categoryname;

            _context.Category.Update (existingCategory);
        }

        public async Task Remove (int id) {
            var existingCategory = await FindByIdAsync (id);
            if (existingCategory == null) throw new Exception ("Category Id not exist");

            _context.Category.Remove (existingCategory);
        }

    }
}