using System.Net.Http;
using System.Web.Http;
using System.Net;
using System.Collections.Generic;
using System.Linq;
namespace webapi.Controllers
{
    public class userController : ApiController
    {
        List<Student> studentList;
        public void addStudent()
        {
            studentList = new List<Student>()
            {
                new Student(){ aridNo=1,name="Ali",city="RWP",cgapa=3.4},
                new Student(){ aridNo=2,name="Hassan",city="RWP",cgapa=3.4},
                new Student(){ aridNo=3,name="Khan",city="RWP",cgapa=3.4},
                new Student(){ aridNo=4,name="Usman",city="RWP",cgapa=3.4},
            };
        }
        //1
        [HttpGet]
        public HttpResponseMessage getStudentByAridNo(int aridNo)
        {
            addStudent();
            var response = studentList.Where(s => s.aridNo == aridNo).FirstOrDefault();
            if (response == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, $"Student not found with this arid no {aridNo}");
            }
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        //2 
        [HttpGet]
        public HttpResponseMessage getAllStudent()
        {
            addStudent();
            if (studentList == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "Students not Found");
            return Request.CreateResponse(HttpStatusCode.OK, studentList);
        }
        //3
        [HttpGet]
        public HttpResponseMessage sumData(double n1, double n2)
        {
            if (n2 == 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Denominator");
            }
            return Request.CreateResponse(HttpStatusCode.OK, n1 / n2);
        }
        //4
        [HttpGet]
        public int addData(int n1, int n2)
        {
            return n1 + n2;
        }
        //5
        [HttpGet]
        public string getname()
        {
            return "Muhammad";
        }
        //6
        public HttpResponseMessage getStudentsByCity(string city)
        {
            addStudent();
            var response = studentList.Where(s => s.city == city).ToList();
            if (response == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, $"Student Not exists with this {city}");
            }
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpGet]
        public string displayName(string name)
        {
            return $"Welcome \r\n {name}";
        }
    }

    public class Student
    {
        public int aridNo { get; set; }
        public string name { get; set; }
        public double cgapa { get; set; }
        public string city { get; set; }
        public int MyProperty { get; set; }
    }
}
