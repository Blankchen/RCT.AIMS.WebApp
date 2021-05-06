using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.ViewModels;
using AIMS.API.Domain.Models;


namespace AIMS.API.Domain.Services {
    public interface IUserService {
        Task<IEnumerable<vmUser>> ListAsync ();
        Task<User> FindByIdAsync (int id);
        Task<User> FindByRfidAsync (string rfid);
        Task<string> SaveAsync (User user);
        Task<string> UpdateAsync (User user);
        Task<string> DeleteAsync (int id);
    }
}