using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Serialization;

public partial class TableFilter : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        //Response.Clear();
        //Response.ContentType = "application/json";
        //Response.Write(GetBooks());
        //Response.End();
    }
    public class Book
    {
        public long BookID { get; set; }
        public string BookTitle { get; set; }
        public string BookAuthor { get; set; }
        public long BookPrice { get; set; }
    }

    [WebMethod]
    public static List<Book> DisplayBooks()
    {
        List<Book> objBook = new List<Book>()
        {
            new Book{BookID=1000, BookTitle="ASP.NET", BookAuthor="A.Mueed", BookPrice=450},
            new Book{BookID=1002, BookTitle="ADO.NET", BookAuthor="A.Mueed", BookPrice=350},
            new Book{BookID=1003, BookTitle="LINQ to SQL", BookAuthor="A.Mueed", BookPrice=400},
            new Book{BookID=1004, BookTitle="jQuery", BookAuthor="A.Mueed", BookPrice=300},
            new Book{BookID=1005, BookTitle="Bootstrap", BookAuthor="A.Mueed", BookPrice=250},
            new Book{BookID=1006, BookTitle="jQueryUI", BookAuthor="A.Mueed", BookPrice=300},
            new Book{BookID=1007, BookTitle="JavaScript", BookAuthor="A.Mueed", BookPrice=500},
        };
        //List<Book> objBook = new List<Book>() { };
        return objBook;
    }

    [WebMethod]
    public static string GetBooks()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<Book> objBook = new List<Book>()
        {
            new Book{BookID=1000, BookTitle="ASP.NET", BookAuthor="A.Mueed", BookPrice=450},
            new Book{BookID=1002, BookTitle="ADO.NET", BookAuthor="A.Mueed", BookPrice=350},
            new Book{BookID=1003, BookTitle="LINQ to SQL", BookAuthor="A.Mueed", BookPrice=400},
            new Book{BookID=1004, BookTitle="jQuery", BookAuthor="A.Mueed", BookPrice=300},
            new Book{BookID=1005, BookTitle="Bootstrap", BookAuthor="A.Mueed", BookPrice=250},
            new Book{BookID=1006, BookTitle="jQueryUI", BookAuthor="A.Mueed", BookPrice=300},
            new Book{BookID=1007, BookTitle="JavaScript", BookAuthor="A.Mueed", BookPrice=500},
        };
        //List<Book> objBook = new List<Book>() { };
        return js.Serialize(objBook);
    }
}