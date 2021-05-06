using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories {
    public interface IAssetRepository {
        Task<IEnumerable<vmAsset>> ListAsync ();
        Task<Asset> FindByIdAsync (int id);
        Task<Asset> FindByRfidAsync (string rfid);
        Task AddAsync (Asset asset);
        Task Update (Asset asset);
        Task Remove (int id);
    }
}