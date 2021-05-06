using System.Threading.Tasks;

namespace AIMS.API.Domain.Repositories
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}