using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories {
    public interface ICirculationRepository {
        Task<IEnumerable<vmAssetIssuereturn>> getReturnAll ();
        Task<vmAssetIssuereturn> getReturnByRfid (string rfid);
        Task returnAsset (vmAssetIssuereturn model);
        Task<IEnumerable<Asset>> getIssueById (int id);
        Task<IEnumerable<vmAssetIssuereturn>> getIssueAll ();
        Task<IEnumerable<vmAssetIssuereturn>> getIssueByRfid (string rfid);
        Task<IEnumerable<vmAsset>> getAllAsset ();
        void issueAsset (vmAssetIssuereturn model);
    }
}