using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories {
    public interface ICategoryRepository {
        Task<IEnumerable<Category>> ListAsync ();
        Task AddAsync (Category category);
        Task<Category> FindByIdAsync (int id);
        Task Update (Category category);
        Task Remove (int id);
    }
}