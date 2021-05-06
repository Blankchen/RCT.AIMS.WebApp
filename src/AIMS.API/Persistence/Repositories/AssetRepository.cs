using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Persistence.Contexts;
using AIMS.API.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AIMS.API.Persistence.Repositories {
    public class AssetRepository : BaseRepository, IAssetRepository {
        private readonly IConfiguration _config;
        public AssetRepository (AppDbContext context, IConfiguration config) : base (context) {
            _config = config;
        }

        public async Task<IEnumerable<vmAsset>> ListAsync () {
            return await (from bk in _context.Asset join ct in _context.Category on bk.Category equals ct.Id join at in _context.Author on bk.Authorid equals at.Id select new vmAsset {
                Id = bk.Id,
                    Assetname = bk.Assetname,
                    Categoryname = ct.Categoryname,
                    RfidCode = bk.RfidCode,
                    Authorname = at.Authorname,
                    IssuedBy = (from ai in _context.AssetIssuereturn join asset in _context.Asset on ai.Assetid equals asset.Id where asset.Id == bk.Id && ai.Status == false select ai.Issueto).FirstOrDefault (),
                    Coverimage = bk.Coverimage
            }).ToListAsync ();
        }

        public async Task<Asset> FindByIdAsync (int id) {
            return await _context.Asset.FirstOrDefaultAsync (x => x.Id == id);
        }

        public async Task<Asset> FindByRfidAsync (string rfid) {
            return await _context.Asset.FirstOrDefaultAsync (x => x.RfidCode == rfid);
        }

        public async Task AddAsync (Asset asset) {
            var maxId = _context.Asset.DefaultIfEmpty ().Max (x => x == null ? 0 : x.Id) + 1;
            var coverimage = await WriteFile(maxId, asset.imageFile);
            //Save Asset
            var assetModel = new Asset {
                Id = maxId,
                Assetname = asset.Assetname,
                Authorid = asset.Authorid,
                Category = asset.Category,
                RfidCode = asset.RfidCode,
                Coverimage = coverimage
            };
            await _context.Asset.AddAsync (assetModel);
        }

        private async Task<string> WriteFile (int id, IFormFile file) {
            if (file == null) {
                return string.Empty;;
            }
            string folderName = _config.GetValue<string> ("UploadImage:Folder");
            string newPath = _config.GetValue<string> ("UploadImage:Path") + folderName;
            string fileName = string.Empty;

            if (!Directory.Exists (newPath)) {
                Directory.CreateDirectory (newPath);
            }
            try {
                string extension = "." + file.FileName.Split ('.') [file.FileName.Split ('.').Length - 1];
                fileName = id.ToString () + extension;
                string fullPath = Path.Combine (newPath, fileName);

                using (var stream = new FileStream (fullPath, FileMode.Create)) {
                    await file.CopyToAsync (stream);
                }
            } catch (Exception e) {
                return e.Message;
            }
            return folderName + "/" + fileName;
        }

        public async Task Update (Asset asset) {
            var existingAsset = await FindByIdAsync (asset.Id);
            if (existingAsset == null) throw new Exception ("Asset Id not exist");
            
            var coverimage = await WriteFile(asset.Id, asset.imageFile);
            existingAsset.Assetname = asset.Assetname;
            existingAsset.Authorid = asset.Authorid;
            existingAsset.Category = asset.Category;
            existingAsset.RfidCode = asset.RfidCode;
            if (!coverimage.Equals (string.Empty)) {
                existingAsset.Coverimage = coverimage;
            }

            _context.Asset.Update (existingAsset);
        }

        public async Task Remove (int id) {
            var existingAsset = await FindByIdAsync (id);
            if (existingAsset == null) throw new Exception ("Asset Id not exist");

            _context.Asset.Remove (existingAsset);
        }

    }
}