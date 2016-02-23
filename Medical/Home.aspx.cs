using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;

public partial class Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static List<PROC_GET_DASHBOARD_DEFAULT_SETTINGSResult> GetDashboardSettings()
    {
        var db = new LINQLocalDataContext();
        var result = (from dashboard in db.PROC_GET_DASHBOARD_DEFAULT_SETTINGS() select dashboard).ToList();
        return result;
    }
    [WebMethod]
    public static string UpdateDashboardSettings(string whereClause)
    {
        string[] widgets = whereClause.Split(';');
        var db = new LINQLocalDataContext();
        for (int i = 0; i < widgets.Length - 1; i++)
        {
            bool showItem = bool.Parse(widgets[i].Split('-')[0]);
            long dashId = long.Parse(widgets[i].Split('-')[1]);
            db.PROC_UPDATE_DASHBOARD_DEFAULT_SETTINGS(showItem, dashId);
        }
        return "Dashboard Updated.";

    }
}