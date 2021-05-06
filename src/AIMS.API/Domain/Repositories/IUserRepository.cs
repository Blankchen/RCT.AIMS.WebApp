using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories {
    public interface IUserRepository {
        Task<IEnumerable<vmUser>> ListAsync ();
        Task AddAsync (User user);
        Task<User> FindByIdAsync (int id);
        Task<User> FindByRfidAsync (string rfid);
        Task Update (User user);
        Task Remove (int id);
    }
}