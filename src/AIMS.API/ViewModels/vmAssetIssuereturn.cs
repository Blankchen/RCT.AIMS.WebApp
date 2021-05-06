using System.Collections.Generic;
using AIMS.API.Domain.Models;

namespace AIMS.API.ViewModels
{
    public class vmAssetIssuereturn
    {
        public int Id { get; set; }
        public int? Memberid { get; set; }
        public string Membername { get; set; }
        public string Email { get; set; }
        public string Issuedate { get; set; }
        public string Duedate { get; set; }
        public string Returndate { get; set; }
        public bool? Status { get; set; }

        public List<Asset> Assets { get; set; }
    }
}
