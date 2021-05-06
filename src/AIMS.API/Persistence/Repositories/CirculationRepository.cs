using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Persistence.Contexts;
using AIMS.API.Utilities;
using AIMS.API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace AIMS.API.Persistence.Repositories {
    public class CirculationRepository : BaseRepository, ICirculationRepository {
        public CirculationRepository (AppDbContext context) : base (context) { }

        public async Task<IEnumerable<vmAssetIssuereturn>> getReturnAll () {
            return await (from bk in _context.AssetIssuereturn join us in _context.User on bk.Issueto equals us.Id where bk.Status == true orderby bk.Returndate descending select new vmAssetIssuereturn {
                Id = bk.Id,
                    Membername = us.Firstname,
                    Issuedate = Convert.ToDateTime (bk.Issuedate).ToString (StaticInfos.GlobalDateFormat),
                    Returndate = Convert.ToDateTime (bk.Returndate).ToString (StaticInfos.GlobalDateFormat),
                    Duedate = Convert.ToDateTime (bk.Duedate).ToString (StaticInfos.GlobalDateFormat),
                    Assets = _context.Asset.Where (x => x.Id == bk.Assetid).ToList ()
            }).ToListAsync ();
        }
        public async Task<vmAssetIssuereturn> getReturnByRfid (string rfid) {
            return await (from bk in _context.AssetIssuereturn join us in _context.User on bk.Issueto equals us.Id where us.RfidCode == rfid && bk.Status == false select new vmAssetIssuereturn {
                Id = bk.Id,
                    Membername = us.Firstname,
                    Duedate = Convert.ToDateTime (bk.Duedate).ToString (StaticInfos.GlobalDateFormat),
                    Assets = _context.Asset.Where (x => x.Id == bk.Assetid).ToList ()
            }).FirstOrDefaultAsync ();
        }
        public async Task returnAsset (vmAssetIssuereturn model) {
            var assetIds = model.Assets.Select (x => x.Id).ToList ();

            var entities = await _context.AssetIssuereturn.AsQueryable ()
                .Where (x => x.Status == false && assetIds.Contains ((int) x.Assetid))
                .ToListAsync ();
            foreach (var entity in entities) {
                entity.Status = true;
                entity.Returndate = DateTime.Now;
            }
        }
        public async Task<IEnumerable<Asset>> getIssueById (int id) {
            var assetIssuereturn = await _context.AssetIssuereturn.FirstOrDefaultAsync (x => x.Id == id);
            if (assetIssuereturn != null) {
                return await _context.Asset.Where (x => x.Id == assetIssuereturn.Assetid).ToListAsync ();
            }
            return Enumerable.Empty<Asset> ();
        }
        public async Task<IEnumerable<vmAssetIssuereturn>> getIssueAll () {
            return await (from bk in _context.AssetIssuereturn join us in _context.User on bk.Issueto equals us.Id join a in _context.Asset on bk.Assetid equals a.Id into assets where bk.Status == false orderby bk.Issuedate descending select new vmAssetIssuereturn {
                Id = bk.Id,
                    Membername = us.Firstname,
                    Issuedate = Convert.ToDateTime (bk.Issuedate).ToString (StaticInfos.GlobalDateFormat),
                    Returndate = Convert.ToDateTime (bk.Returndate).ToString (StaticInfos.GlobalDateFormat),
                    Duedate = Convert.ToDateTime (bk.Duedate).ToString (StaticInfos.GlobalDateFormat),
                    Assets = assets.ToList ()
            }).ToListAsync ();
        }
        public async Task<IEnumerable<vmAssetIssuereturn>> getIssueByRfid (string rfid) {
            var userQuery = _context.User.AsQueryable ().Where (x => x.RfidCode == rfid);
            var assetQuery = _context.Asset.AsQueryable ();

            return (await _context.AssetIssuereturn.AsQueryable ()
                    .Where (x => x.Status == false)
                    .Join (assetQuery, o => o.Assetid, i => i.Id, (o, i) => new { m = o, a = i })
                    .Join (userQuery, o => o.m.Issueto, i => i.Id, (o, i) => new { o.m, o.a, u = i })
                    .ToListAsync ())
                .Select (x => new vmAssetIssuereturn {
                    Id = x.m.Id,
                        Memberid = x.u.Id,
                        Membername = x.u.Firstname,
                        Email = x.u.Email,
                        Duedate = x.m.Duedate.ToString (),
                        Assets = new List<Asset> { x.a }
                });
        }
        public async Task<IEnumerable<vmAsset>> getAllAsset () {
            return await (from bk in _context.Asset join ct in _context.Category on bk.Category equals ct.Id join at in _context.Author on bk.Authorid equals at.Id select new vmAsset {
                Id = bk.Id,
                    Assetname = bk.Assetname,
                    Categoryname = ct.Categoryname,
                    Authorname = at.Authorname,
                    Coverimage = bk.Coverimage
            }).ToListAsync ();
        }
        public void issueAsset (vmAssetIssuereturn model) {
            var maxId = _context.AssetIssuereturn.Select (x => x.Id).DefaultIfEmpty ().Max () + 1;

            foreach (var item in model.Assets) {
                _context.AssetIssuereturn.Add (new AssetIssuereturn {
                    Id = maxId,
                        Issueto = model.Memberid,
                        Assetid = item.Id,
                        Issuedate = DateTime.Now,
                        Duedate = Convert.ToDateTime (model.Duedate),
                        Status = false
                });

                maxId++;
            }
        }
    }
}