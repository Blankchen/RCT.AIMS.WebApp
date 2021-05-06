using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories {
    public interface IAuthorRepository {
        Task<IEnumerable<Author>> ListAsync ();
        Task AddAsync (Author author);
        Task<Author> FindByIdAsync (int id);
        Task Update (Author author);
        Task Remove (int id);
    }
}