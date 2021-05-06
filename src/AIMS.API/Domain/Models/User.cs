using System;
using System.Collections.Generic;

namespace AIMS.API.Domain.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string RfidCode { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
    }
}
