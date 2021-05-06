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
    public class UserRepository : BaseRepository, IUserRepository {
        public UserRepository (AppDbContext context) : base (context) { }

        public async Task<IEnumerable<vmUser>> ListAsync () {
            return await (from user in _context.User select new vmUser {
                Id = user.Id,
                    IssueCount = (from aid in _context.AssetIssuereturn where user.Id == aid.Issueto && aid.Status == false select aid.Id).Count (),
                    RfidCode = user.RfidCode,
                    Firstname = user.Firstname,
                    Lastname = user.Lastname,
                    Email = user.Email,
                    Contact = user.Contact
            }).ToListAsync ();
        }

        public async Task<User> FindByIdAsync (int id) {
            return await _context.User.FirstOrDefaultAsync (x => x.Id == id);
        }

        public async Task<User> FindByRfidAsync (string rfid) {
            return await _context.User.FirstOrDefaultAsync (x => x.RfidCode == rfid);
        }

        public async Task AddAsync (User user) {
            var maxId = _context.User.DefaultIfEmpty ().Max (x => x == null ? 0 : x.Id) + 1;
            var userModel = new User {
                Id = maxId,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Contact = user.Contact,
                RfidCode = user.RfidCode
            };
            await _context.User.AddAsync (userModel);
        }

        public async Task Update (User user) {
            var existingUser = await FindByIdAsync (user.Id);
            if (existingUser == null) throw new Exception ("User Id not exist");
            existingUser.Firstname = user.Firstname;
            existingUser.Lastname = user.Lastname;
            existingUser.Contact = user.Contact;
            existingUser.RfidCode = user.RfidCode;
            _context.User.Update (existingUser);
        }

        public async Task Remove (int id) {
            var existingUser = await FindByIdAsync (id);
            if (existingUser == null) throw new Exception ("User Id not exist");

            _context.User.Remove (existingUser);
        }

    }
}