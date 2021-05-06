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
    public class AuthorRepository : BaseRepository, IAuthorRepository {
        public AuthorRepository (AppDbContext context) : base (context) { }

        public async Task<IEnumerable<Author>> ListAsync () {
            return await _context.Author.ToListAsync ();
        }

        public async Task<Author> FindByIdAsync (int id) {
            return await _context.Author.FirstOrDefaultAsync (x => x.Id == id);
        }

        public async Task AddAsync (Author author) {
            var maxId = _context.Author.DefaultIfEmpty ().Max (x => x == null ? 0 : x.Id) + 1;
            var authorModel = new Author {
                Id = maxId,
                Authorname = author.Authorname
            };
            await _context.Author.AddAsync (authorModel);
        }

        public async Task Update (Author author) {
            var existingAuthor = await FindByIdAsync (author.Id);
            if (existingAuthor == null) throw new Exception ("Author Id not exist");
            existingAuthor.Authorname = author.Authorname;
            
            _context.Author.Update (existingAuthor);
        }

        public async Task Remove (int id) {
            var existingAuthor = await FindByIdAsync (id);
            if (existingAuthor == null) throw new Exception ("Author Id not exist");

            _context.Author.Remove (existingAuthor);
        }

    }
}