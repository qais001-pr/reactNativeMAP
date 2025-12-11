using LMS.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LMS.Controllers
{
    public class UserController : ApiController
    {
        LMSEntities2 _context;

        public UserController()
        {
            _context = new LMSEntities2();
        }
        public UserController(LMSEntities2 context)
        {
            _context = context;
        }
        [HttpPost]
        public HttpResponseMessage signUpAdmin(UserSignUp u)
        {
            if (u.Email == null && u.password == null && u.image64String == null && u.Fullname == null && u.imageType == null && u.image64String == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid user data");
            }

            var user = _context.Users.Where(x => x.Email == u.Email).FirstOrDefault();
            if (user != null)
            {
                return Request.CreateResponse(HttpStatusCode.Conflict, "User already exists");

            }
            var imageBytes = Convert.FromBase64String(u.image64String);
            u.imageBytes = imageBytes;
            User userData = new User()
            {
                FullName = u.Fullname,
                Email = u.Email,
                Password = u.password,
                imageType = u.imageType,
                imageBytes = u.imageBytes,
            };
            _context.Users.Add(userData);
            _context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Admin Created Successfully");
        }


        [HttpPost]
        public HttpResponseMessage loginUserorStudent(Auth a)
        {
            var responseUser = _context.Users.Where(x => x.Email == a.emailORAridNO && x.Password == a.password).FirstOrDefault();
            if (responseUser == null)
            {
                var responseStudent = from student in _context.Students
                                      where student.aridno == a.emailORAridNO && student.password == a.password
                                      select new
                                      {
                                          student.studentid,
                                          student.userid,
                                          student.aridno,
                                          student.fullname,
                                          student.fathername,
                                          student.degree,
                                          student.section,
                                          student.semester,
                                          student.city,
                                          student.imageType,
                                          student.imageBytes
                                      };
                if (responseUser != null)
                    return Request.CreateResponse(new { statusCode = HttpStatusCode.OK, message = "Student Login Successful", data = responseStudent, role = "Student" });
            }
            return Request.CreateResponse(new { statusCode = HttpStatusCode.OK, message = "Invalid Data" });
        }


        [HttpPost]
        public HttpResponseMessage addStudent(StudentSignup s)
        {
            if (string.IsNullOrWhiteSpace(s.fullname) ||
                string.IsNullOrWhiteSpace(s.fathername) ||
                string.IsNullOrWhiteSpace(s.degree) ||
                string.IsNullOrWhiteSpace(s.section) ||
                s.semester <= 0 ||
                string.IsNullOrWhiteSpace(s.city) ||
                string.IsNullOrWhiteSpace(s.imageType) ||
                string.IsNullOrWhiteSpace(s.image64String) ||
                string.IsNullOrWhiteSpace(s.password))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Data");
            }

            byte[] imageBytes = Convert.FromBase64String(s.image64String);

            _context.Students.Add(new Student()
            {
                aridno = s.aridno,
                fullname = s.fullname,
                fathername = s.fathername,
                degree = s.degree,
                section = s.section,
                semester = s.semester,
                city = s.city,
                imageType = s.imageType,
                imageBytes = imageBytes,
                userid = s.userid,
                password = s.password
            });

            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, "Data Saved Successfully");
        }


        [HttpGet]
        public HttpResponseMessage GetAllStudents()
        {
            var student = from s in _context.Students
                          select new
                          {
                              s.studentid,
                              s.userid,
                              s.aridno,
                              s.fullname,
                              s.fathername,
                              s.degree,
                              s.section,
                              s.semester,
                              s.city,
                              s.imageType,
                              s.imageBytes
                          };
            if (student == null)
            {
                return Request.CreateResponse(new { statusCode = HttpStatusCode.NoContent, data = student });
            }
            return Request.CreateResponse(new { statusCode = HttpStatusCode.OK, data = student });
        }


        [HttpGet]
        public HttpResponseMessage getAllBooks()
        {
            var books =
                from s in _context.Books
                select new
                {
                    s.bookid,
                    s.ISBN,
                    s.BookTitle,
                    s.publishDate,
                    s.price,
                    s.quantity,
                    s.imagetype,
                    s.imageBytes
                };
            if (books == null)
                return Request.CreateResponse(new { statusCode = HttpStatusCode.NoContent, data = books });
            return Request.CreateResponse(new { statusCode = HttpStatusCode.OK, data = books });
        }

        [HttpPost]
        public HttpResponseMessage addBooks(BookSignUp b)
        {
            if (string.IsNullOrWhiteSpace(b.ISBN)
                ||
                string.IsNullOrWhiteSpace(b.BookTitle) ||
                string.IsNullOrWhiteSpace(b.publishDate)
                ||
                b.price <= 0 || b.quantity <= 0
                ||
                string.IsNullOrWhiteSpace(b.imageType) ||
                string.IsNullOrWhiteSpace(b.image64String))
            {
                return Request.CreateResponse(new
                {
                    statusCode = HttpStatusCode.NoContent,
                    message = "Invalid Data"
                });
            }
            var binarydata = Convert.FromBase64String(b.image64String);

            _context.Books.Add(new Book()
            {
                ISBN = b.ISBN,
                BookTitle = b.BookTitle,
                publishDate = b.publishDate,
                price = b.price,
                quantity = b.quantity,
                imagetype = b.imageType,
                imageBytes = binarydata
            });
            _context.SaveChanges();
            return Request.CreateResponse(new
            {
                StatusCode = HttpStatusCode.OK,
                message = "Book Added Successfully"
            });
        }


        [HttpPost]
        public HttpResponseMessage IssueBook(IssueBookToStudent s)
        {
            if (s.studentid <= 0 || s.bookid <= 0 ||
                string.IsNullOrWhiteSpace(s.status) ||
                s.IssueDate == null || s.returnDate == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                    new { message = "Invalid Data" });
            }

            var book = _context.Books.FirstOrDefault(x => x.bookid == s.bookid);
            var student = _context.Students.FirstOrDefault(x => x.studentid == s.studentid);

            if (book == null || student == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Book or Student not found" });
            }
            book.quantity -= 1;

            var issue = new IssueBook()
            {
                Book = book,
                Student = student,
                IssueDate = s.IssueDate,
                ReturnDate = s.returnDate,
                status = s.status,
                fine = 0
            };

            _context.IssueBooks.Add(issue);
            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Book Issued Successfully" });
        }

        [HttpGet]
        public HttpResponseMessage GetAllIssuedBooks()
        {
            var issued =
                        from ib in _context.IssueBooks
                        join s in _context.Students on ib.Student.studentid equals s.studentid
                        join b in _context.Books on ib.Book.bookid equals b.bookid
                        select new
                        {
                            b.bookid,
                            b.BookTitle,
                            b.ISBN,
                            b.price,
                            b.publishDate,
                            b.quantity,
                            b.imagetype,
                            b.imageBytes,
                            ib.issueBookid,
                            ib.IssueDate,
                            ib.ReturnDate,
                            ib.status,
                            ib.fine
                        };


            return Request.CreateResponse(HttpStatusCode.OK,
                new { data = issued });
        }


        [HttpPut]
        [Route("{studentid}/{bookid}")]
        public HttpResponseMessage returnBookToLibrarian(int studentid, int bookid)
        {
            var issuebook = _context.IssueBooks
                .FirstOrDefault(i => i.Student.studentid == studentid &&
                                     i.Book.bookid == bookid &&
                                     i.status == "issued");

            if (issuebook == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { message = "Record not found" });
            }

            issuebook.status = "returned";
            issuebook.Book.quantity += 1;

            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK,
                new { message = "Book Returned Successfully" });
        }
    }
}