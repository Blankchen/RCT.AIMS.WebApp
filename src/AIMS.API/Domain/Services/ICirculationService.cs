using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Services {
    public interface ICirculationService {
        Task<IEnumerable<vmAssetIssuereturn>> getReturnAll ();
        Task<vmAssetIssuereturn> getReturnByRfid (string rfid);
        Task<string> returnAsset (vmAssetIssuereturn model);
        Task<IEnumerable<Asset>> getIssueById (int id);
        Task<IEnumerable<vmAssetIssuereturn>> getIssueAll ();
        Task<IEnumerable<vmAssetIssuereturn>> getIssueByRfid (string rfid);
        Task<IEnumerable<vmAsset>> getAllAsset ();
        Task<string> issueAsset (vmAssetIssuereturn model);
    }
}