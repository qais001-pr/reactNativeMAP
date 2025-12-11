using System;

namespace LMS.Models
{
    public class IssueBookToStudent
    {
        public int studentid { get; set; }
        public int bookid { get; set; }
        public string status { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime returnDate { get; set; }
    }
}