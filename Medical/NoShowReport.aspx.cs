using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

public partial class NoShowReport : System.Web.UI.Page
{
    private const long PracticeCode = 9090999;

    protected void Page_Load(object sender, EventArgs e)
    {
        GetProviders();
        GetLocation();
    }
    protected void GetLocation()
    {
        var db = new MedicalLINQDataContext();
        var result = (from practice in db.WEBEHR_PROC_GETLOCATION_TEMP(PracticeCode) select practice).ToList();
        var locations = new WEBEHR_PROC_GETLOCATION_TEMPResult
        {
            LOCATION_CODE = 0,
            LOCATION_NAME = "All Locations"
        };
        result.Insert(0, locations);
        ddlLoc.DataSource = result;
        ddlLoc.DataTextField = "LOCATION_NAME";
        ddlLoc.DataValueField = "LOCATION_CODE";
        ddlLoc.DataBind();
    }
    protected void GetProviders()
    {
        var db = new MedicalLINQDataContext();
        var providers = (from provider in db.WEBEHR_PROC_GETPROVIDER_TEMP(PracticeCode) select provider).ToList();
        var p = new WEBEHR_PROC_GETPROVIDER_TEMPResult
        {
            PROVIDER_CODE = 0,
            PROVIDER_NAME = "All Providers"
        };
        providers.Insert(0, p);
        ddlProCode.DataSource = providers;
        ddlProCode.DataTextField = "PROVIDER_NAME";
        ddlProCode.DataValueField = "PROVIDER_CODE";
        ddlProCode.DataBind();
    }

    [WebMethod]
    public static List<WEBEHR_PROC_GETQUERY_REPORT_TEMP2Result> GetQueryReport(string dateFrom, string dateTo, long Provider_Code, long Location)
    {
        var db = new MedicalLINQDataContext();
        var result = db.WEBEHR_PROC_GETQUERY_REPORT_TEMP2(dateFrom, dateTo, Provider_Code, Location, PracticeCode).ToList();
        return result;
    }
}