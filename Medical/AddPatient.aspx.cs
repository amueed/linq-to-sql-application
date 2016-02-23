using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Configuration;
using System.Globalization;

public partial class AppPatient : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static string InsertPatient(string ChartID, string AlternateAcc, string Lname, string Fname, char MI, string DOB, string SSN, string Gender,
        string Marital, string Race, string Race2, string Ethnicity, string Lang, string Address, string Address2, string AddressType, string Zip, string ParishCode, 
        string City, string State, string Home, string Cell, string Work, string Email, string CCP, string Recall, string EmeName, string EmeRelation,
        string EmePhone, string Lab, string Pharmacy1, string Pharmacy2, string DOD, string COD, string Provider, string ProLocation, string FGName, string FGRel)
    {
        MedicalLINQDataContext db = new MedicalLINQDataContext();
        Patient _objPat = new Patient();
        List<Patient> pt = new List<Patient>();
        Random random = new Random();
        int i = random.Next(99999);
        //pt = (from pat in db.Patients
        //      orderby pat.Patient_Account descending
        //      select pat).Take(1).ToList<Patient>();
        //long id = pt;
        _objPat.Patient_Account = long.Parse("9090999" + i);
            _objPat.Chart_Id = ChartID;
        _objPat.First_Name = Fname;
        _objPat.Last_Name = Lname;
        _objPat.Date_Of_Birth = DateTime.Parse(DOB);
        _objPat.MI = MI;

            _objPat.SSN = SSN;
        _objPat.Gender = Gender;

            _objPat.Marital_Status = Marital;
        _objPat.race = Race;

            _objPat.RACE2 = Race2;
        _objPat.ETHNICITIES = Ethnicity;
        _objPat.languages = Lang;
        _objPat.Address = Address;

            _objPat.Address_Line2 = Address2;
        _objPat.ZIP = Zip;

            _objPat.CountyParish_code = ParishCode;
        _objPat.City = City;
        _objPat.State = State;

            _objPat.Home_Phone = Home;
        _objPat.cell_phone = Cell;

            _objPat.Business_Phone = Work;
        _objPat.Email_Address = Email;

            _objPat.emer_contact_name = EmeName;

            _objPat.emer_contact_rel = EmeRelation;

        _objPat.emer_contact_ph = EmePhone;
        //_objPat.disabled_date = DateTime.Parse(DOD);
        _objPat.disabled_date = DateTime.Now;
        _objPat.DeathCause = COD;
        _objPat.guar_rel = FGRel;
        _objPat.Created_Date = DateTime.Now;
        _objPat.Modified_Date = DateTime.Now;
        _objPat.Recall_Date = DateTime.Now;
        _objPat.PTL_Date = DateTime.Now;
        _objPat.Confirmation_Date = DateTime.Now;
        _objPat.Effective_Date = DateTime.Now;
        _objPat.Scan_Date = DateTime.Now;
        _objPat.SCAN_DATE_PTL = DateTime.Now;
        _objPat.Sync_Date = DateTime.Now;
        _objPat.Web_Resolve_Date = DateTime.Now;
        _objPat.CHK_Bounce_Date = DateTime.Now;
        _objPat.CHK_Bounce_Entry_Date = DateTime.Now;
        _objPat.Expiry_Date = DateTime.Now;
        _objPat.Created_By = "";
        _objPat.Modified_By = "";
        try
        {
            db.Patients.InsertOnSubmit(_objPat);
            db.SubmitChanges();
            return _objPat.Patient_Account.ToString();
        }
        catch (Exception ex)
        {
            return ex.ToString();
        }
    }

    [WebMethod]
    public static List<Patient> SelectData()
    {
        MedicalLINQDataContext db = new MedicalLINQDataContext();
        List<Patient> lstPatient = new List<Patient>();
        lstPatient = (from pat in db.Patients
                      where pat.Created_Date <= DateTime.Now && pat.Created_Date > DateTime.Now.AddMonths(-3)
                      orderby pat.Created_Date descending
                      select pat).ToList<Patient>();


        return lstPatient;

    }

    [WebMethod]
    public static List<Zip_City_State> getCity(string ZIP)
    {
        MedicalLINQDataContext db = new MedicalLINQDataContext();
        List<Zip_City_State> lstZip = new List<Zip_City_State>();
        lstZip = (from x in db.Zip_City_States where x.ZIP_Code == ZIP && x.Deleted == false select x).ToList<Zip_City_State>();


        return lstZip;

    }
}