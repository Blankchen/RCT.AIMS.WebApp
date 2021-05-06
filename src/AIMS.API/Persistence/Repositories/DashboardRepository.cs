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
    public class DashboardRepository : BaseRepository, IDashboardRepository {
        public DashboardRepository (AppDbContext context) : base (context) { }

        public async Task<vmSummary> getAllSummary () {

            var tmember = await (from u in _context.User select u).CountAsync ();
            var tasset = await (from b in _context.Asset select b).CountAsync ();
            var tissued = await (from i in _context.AssetIssuereturn where i.Status == false select i).CountAsync ();
            var treturn = await (from r in _context.AssetIssuereturn where r.Status == true select r).CountAsync ();

            return new vmSummary () {
                totalAsset = tasset,
                    totalMember = tmember,
                    totalIssued = tissued,
                    totalReturned = treturn
            };
        }

        public async Task<IEnumerable<vmAssetchart>> getAssetChart () {
            return await (from p in _context.Asset join c in _context.AssetIssuereturn on p.Id equals c.Assetid into g select new vmAssetchart {
                bid = p.Id,
                    bname = p.Assetname,
                    nissue = g.Count ()
            }).ToListAsync ();
        }

        public async Task<IEnumerable<vmMemberchart>> getMemberChart () {
            return await (from p in _context.User join c in _context.AssetIssuereturn on p.Id equals c.Issueto into g select new vmMemberchart {
                tid = p.Id,
                    mname = p.Firstname,
                    ntrans = g.Count ()
            }).ToListAsync ();
        }
    }
}