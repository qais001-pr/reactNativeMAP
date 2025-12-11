namespace LMS.Models
{
    public class UserSignUp
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string password { get; set; }
        public string imageType { get; set; }
        public string image64String { get; set; }
        public byte[] imageBytes { get; set; }
    }
}