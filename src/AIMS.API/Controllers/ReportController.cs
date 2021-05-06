using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AIMS.API.Controllers {
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class ReportController : Controller {
        private readonly IDashboardService _dashboardService;

        public ReportController (IDashboardService dashboardService) {
            this._dashboardService = dashboardService;
        }

        // GET: api/report/getbookchart
        [HttpGet ("[action]")]
        public async Task<IEnumerable<vmAssetchart>> getassetchart () {
            return await _dashboardService.getAssetChart ();
        }

        // GET: api/report/getmemberchart
        [HttpGet ("[action]")]
        public async Task<IEnumerable<vmMemberchart>> getmemberchart () {
            return await _dashboardService.getMemberChart ();
        }
    }
}