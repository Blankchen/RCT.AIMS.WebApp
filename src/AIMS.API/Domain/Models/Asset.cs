using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace AIMS.API.Domain.Models
{
    public partial class Asset
    {
        public int Id { get; set; }
        public int? Authorid { get; set; }
        public int? Category { get; set; }
        [NotMapped]
        public IFormFile imageFile { get; set; }
        public string RfidCode { get; set; }
        public string Assetname { get; set; }
        public string Coverimage { get; set; }
    }
}
