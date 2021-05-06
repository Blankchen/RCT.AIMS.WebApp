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
    public class CirculationController : Controller
    {
        private readonly ICirculationService _circulationService;

        public CirculationController(ICirculationService circulationService)
        {
            this._circulationService = circulationService;
        }

        #region --Return
        // GET: api/circulation/getreturnall
        [HttpGet("[action]")]
        public async Task<IEnumerable<vmAssetIssuereturn>> getreturnall()
        {
            return await _circulationService.getReturnAll();
        }

        // GET api/circulation/getreturnbyrfid/1
        [HttpGet("[action]/{rfid}")]
        public async Task<vmAssetIssuereturn> getreturnbyrfid(string rfid)
        {
            return await _circulationService.getReturnByRfid(rfid);
        }

        // POST: api/circulation/returnasset
        [HttpPost("[action]")]
        public async Task<object> returnasset([FromBody] vmAssetIssuereturn model)
        {
            return await _circulationService.returnAsset(model);
        }
        #endregion


        #region --Issue
        // GET: api/circulation/getissuebyid/1
        [HttpGet("[action]/{id}")]
        public async Task<IEnumerable<Asset>> getissuebyid(int id)
        {
            return await _circulationService.getIssueById(id);
        }

        // GET: api/circulation/getissueall
        [HttpGet("[action]")]
        public async Task<IEnumerable<vmAssetIssuereturn>> getissueall()
        {
            return await _circulationService.getIssueAll();
        }

        // GET api/circulation/getissuebyrfid/1
        [HttpGet("[action]/{rfid}")]
        public async Task<IEnumerable<vmAssetIssuereturn>> getissuebyrfid(string rfid)
        {
            return await _circulationService.getIssueByRfid(rfid);
        }

        // GET: api/circulation/getallasset
        [HttpGet("[action]")]
        public async Task<IEnumerable<vmAsset>> getallasset()
        {
            return await _circulationService.getAllAsset();
        }

        // POST: api/circulation/issueasset
        [HttpPost("[action]")]
        public async Task<object> issueasset([FromBody] vmAssetIssuereturn model)
        {
            return await _circulationService.issueAsset(model);
        }
        #endregion
    }
}