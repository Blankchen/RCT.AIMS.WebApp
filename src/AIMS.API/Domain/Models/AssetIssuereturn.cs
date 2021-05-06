using System;
using System.Collections.Generic;

namespace AIMS.API.Domain.Models
{
    public partial class AssetIssuereturn
    {
        public int Id { get; set; }
        public int? Assetid { get; set; }
        public int? Issueto { get; set; }
        public DateTime? Issuedate { get; set; }
        public DateTime? Duedate { get; set; }
        public DateTime? Returndate { get; set; }
        public bool? Status { get; set; }
    }
}
