namespace LMS.Models
{
    public class BookSignUp
    {
        public string ISBN { get; set; }
        public string BookTitle { get; set; }
        public string publishDate { get; set; }
        public double price { get; set; }
        public int quantity { get; set; }
        public string imageType { get; set; }
        public string image64String { get; set; }
        public byte[] imageBytes { get; set; }
    }
}