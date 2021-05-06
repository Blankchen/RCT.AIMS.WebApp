using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories
{
    public interface IDropdownRepository
    {
        Task<IEnumerable<Author>> getAllAuthor();
        Task<IEnumerable<Category>> getAllCategory();
    }
}