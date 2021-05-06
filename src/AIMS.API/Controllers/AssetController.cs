using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AIMS.API.Controllers {
    [Route ("api/[controller]"), Produces ("application/json")]
    [ApiController]
    public class AssetController : Controller {
        private readonly IAssetService _assetService;

        public AssetController (IAssetService assetService) {
            _assetService = assetService;
        }

        // GET: api/asset/getall
        [HttpGet ("[action]")]
        public async Task<IEnumerable<vmAsset>> getall () {
            return await _assetService.ListAsync ();
        }

        // GET api/asset/getbyid/1
        [HttpGet ("[action]/{id}")]
        public async Task<Asset> getbyid (int id) {
            return await _assetService.FindByIdAsync (id);
        }

        // GET api/asset/getbyrfid/1
        [HttpGet ("[action]/{rfid}")]
        public async Task<Asset> getbyrfid (string rfid) {
            return await _assetService.FindByRfidAsync (rfid);
        }

        // POST: api/asset/save
        [HttpPost ("[action]")]
        public async Task<object> save () {
            var imageFile = Request.Form.Files.Count > 0 ? Request.Form.Files[0] : null;
            //Save
            Asset model = new Asset () {
                Id = Convert.ToInt32 (Request.Form["id"]),
                Assetname = Request.Form["assetName"].ToString (),
                Authorid = Convert.ToInt32 (Request.Form["authorId"]),
                Category = Convert.ToInt32 (Request.Form["category"]),
                RfidCode = Request.Form["rfidCode"].ToString (),
                imageFile = imageFile,
                Coverimage = string.Empty
            };
            if (model.Id == 0) {
                return await _assetService.SaveAsync (model);
            } else {
                return await _assetService.UpdateAsync (model);
            }
        }

        // DELETE api/asset/deletebyid/1
        [HttpDelete ("[action]/{id}")]
        public async Task<object> deletebyid (int id) {
            return await _assetService.DeleteAsync (id);
        }

    }
}