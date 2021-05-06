using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.ViewModels;
using AIMS.API.Domain.Models;


namespace AIMS.API.Domain.Services {
    public interface IAuthorService {
        Task<IEnumerable<Author>> ListAsync ();
        Task<Author> FindByIdAsync (int id);
        Task<string> SaveAsync (Author author);
        Task<string> UpdateAsync (Author author);
        Task<string> DeleteAsync (int id);
    }
}