using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.ViewModels;
using AIMS.API.Domain.Models;


namespace AIMS.API.Domain.Services {
    public interface IAssetService {
        Task<IEnumerable<vmAsset>> ListAsync ();
        Task<Asset> FindByIdAsync (int id);
        Task<Asset> FindByRfidAsync (string rfid);
        Task<string> SaveAsync (Asset asset);
        Task<string> UpdateAsync (Asset asset);
        Task<string> DeleteAsync (int id);
    }
}