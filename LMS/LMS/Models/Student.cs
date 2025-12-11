namespace LMS.Models
{
    public class StudentSignup
    {
        public string aridno { get; set; }
        public string password { get; set; }
        public string fullname { get; set; }
        public string fathername { get; set; }
        public string degree { get; set; }
        public string section { get; set; }
        public int semester { get; set; }
        public string city { get; set; }
        public string imageType { get; set; }
        public byte[] imageBytes { get; set; }
        public int userid { get; set; }
        public string image64String { get; set; }
    }
}