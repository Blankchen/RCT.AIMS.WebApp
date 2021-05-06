using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AIMS.API.ViewModels;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;

namespace AIMS.API.Controllers
{
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class DashboardController : Controller
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            this._dashboardService = dashboardService;
        }

        // GET: api/dashboard/getallsummary
        [HttpGet("[action]")]
        public async Task<vmSummary> getallsummary()
        {
            return await _dashboardService.getAllSummary();
        }
    }
}