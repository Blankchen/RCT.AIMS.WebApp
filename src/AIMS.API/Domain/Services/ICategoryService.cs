using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;

namespace AIMS.API.Domain.Services {
    public interface ICategoryService {
        Task<IEnumerable<Category>> ListAsync ();
        Task<Category> FindByIdAsync (int id);
        Task<string> SaveAsync (Category category);
        Task<string> UpdateAsync (Category category);
        Task<string> DeleteAsync (int id);
    }
}