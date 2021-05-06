using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.ViewModels;

namespace AIMS.API.Domain.Repositories
{
    public interface IDashboardRepository
    {
        Task<vmSummary> getAllSummary();
        Task<IEnumerable<vmAssetchart>> getAssetChart();
        Task<IEnumerable<vmMemberchart>> getMemberChart();
    }
}