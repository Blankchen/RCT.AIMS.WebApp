namespace AIMS.API.ViewModels
{
    public class vmAsset
    {
        public int Id { get; set; }
        public string Authorname { get; set; }
        public string Categoryname { get; set; }
        public string RfidCode { get; set; }
        public string Assetname { get; set; }
        public int? IssuedBy { get; set; }
        public string Coverimage { get; set; }
    }
}
