using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;

namespace AIMS.API.Services {
    public class DashboardService : IDashboardService {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService (IDashboardRepository dashboardRepository) {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<vmSummary> getAllSummary () {
            return await _dashboardRepository.getAllSummary ();
        }

        public async Task<IEnumerable<vmAssetchart>> getAssetChart () {
            return await _dashboardRepository.getAssetChart ();
        }

        public async Task<IEnumerable<vmMemberchart>> getMemberChart () {
            return await _dashboardRepository.getMemberChart ();
        }
    }
}