using System.Collections.Generic;

namespace AIMS.API.ViewModels
{
    public class vmAssetIssue
    {
        public int Id { get; set; }
        public string Membername { get; set; }
        public string Email { get; set; }
        public string Duedate { get; set; }

        public List<vmAsset> Books { get; set; }
    }
}
