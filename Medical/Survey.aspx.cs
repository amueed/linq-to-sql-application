using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;

public partial class Survey : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static void SaveQuestion(string Question)
    {
        try
        {
            LINQLocalDataContext db = new LINQLocalDataContext();
            Random rnd = new Random();
            long ques_id = Convert.ToInt64("5000" + rnd.Next(999));
            string insertQuery = "INSERT INTO PCMH_SURVEY_QUESTIONS(PCMH_QUESTIONS_ID, PCMH_QUESTION, PRACTICE_CODE, CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY, DELETED) VALUES('" + ques_id + "','" + Question + "','9090999','" + DateTime.Now + "','Mueed-6489','" + DateTime.Now + "','Mueed - 6489','false');";
            db.ExecuteCommand(insertQuery);
        }
        catch (Exception ex) 
        {
            throw ex;    
        }
    }

    [WebMethod]
    public static List<PCMH_SURVEY_QUESTION> LoadQuestions()
    {
        LINQLocalDataContext db = new LINQLocalDataContext();
        var result = (from question in db.PCMH_SURVEY_QUESTIONs
                      orderby question.MODIFIED_DATE descending
                      where question.DELETED == false
                      select question).ToList<PCMH_SURVEY_QUESTION>();
        return result;
    }

    [WebMethod]
    public static void UpdateQuestion(long QuestionID, string Question)
    {
        LINQLocalDataContext db = new LINQLocalDataContext();
        DateTime ModifiedDate = DateTime.Now;

        string updateQuery = "UPDATE PCMH_SURVEY_QUESTIONS SET PCMH_QUESTION='" + Question + "', MODIFIED_BY='Mueed-6489', MODIFIED_DATE='" + ModifiedDate + "' WHERE PCMH_QUESTIONS_ID = '" + QuestionID + "';";
        db.ExecuteCommand(updateQuery);
    }

    [WebMethod]
    public static void DeleteQuestion(long QuestionID)
    {
        LINQLocalDataContext db = new LINQLocalDataContext();
        string deleteQuery = "UPDATE PCMH_SURVEY_QUESTIONS SET DELETED='true' WHERE PCMH_QUESTIONS_ID = '" + QuestionID + "';";
        db.ExecuteCommand(deleteQuery);
    }

    [WebMethod]
    public static void SaveSurvey(string SurveyTitle, string SurveyDesc, int SurveyTarget, DateTime SurveyDeadline, string QuestionArray)
    {
        string[] QuestionData =  QuestionArray.Split(',');
        try
        {
            LINQLocalDataContext db = new LINQLocalDataContext();

            Random rnd = new Random();
            long survey_id = Convert.ToInt64("1000" + rnd.Next(9999));

            string insertQuery = "INSERT INTO PCMH_SURVEYS(PCMH_SURVEY_ID, PCMH_SURVEY_TITLE, PCMH_SURVEY_DESCRIPTION, PRACTICE_CODE, DELETED, CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY, PCMH_Target, DeadLine_Date ) VALUES('" + survey_id + "','" + SurveyTitle + "','" + SurveyDesc + "','9090999','false','" + DateTime.Now + "','Mueed-6489','" + DateTime.Now + "','Mueed - 6489','" + SurveyTarget + "', '" + SurveyDeadline + "');";

            db.ExecuteCommand(insertQuery);
            
            for (int i= 0; i < QuestionData.Length - 1; i++)
            {
                long QuestionID = long.Parse(QuestionData[i]);
                long sur_que_id = Convert.ToInt64("2000" + rnd.Next(9999));

                string insertQuery2 = "INSERT INTO PCMH_SURVEY_RELATED_QUESTIONS(PCMH_SER_QUE_ID, SURVEY_ID, QUESTIONS_ID, PRACTICE_CODE, DELETED, CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY) VALUES('" + sur_que_id + "','" + survey_id + "','" + QuestionID + "','9090999','false','" + DateTime.Now + "','Mueed-6489','" + DateTime.Now + "','Mueed - 6489');";
                db.ExecuteCommand(insertQuery2);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public static List<PCMH_SURVEY> LoadSurvey()
    {
        LINQLocalDataContext db = new LINQLocalDataContext();
        var result = (from survey in db.PCMH_SURVEYs
                      orderby survey.MODIFIED_DATE descending
                      where survey.DELETED == false
                      select survey).ToList<PCMH_SURVEY>();
        return result;
    }

    [WebMethod]
    public static List<PCMH_PROC_GET_SURVEY_QUESTIONSResult> LoadQuestionsOfThisSurvey(long SurveyID)
    {
        LINQLocalDataContext db = new LINQLocalDataContext();
        var result = db.PCMH_PROC_GET_SURVEY_QUESTIONS(SurveyID).ToList<PCMH_PROC_GET_SURVEY_QUESTIONSResult>();
        return result;
    }

    [WebMethod]
    public static void DeleteThisSurvey(long SurveyID)
    {
        try
        {
            LINQLocalDataContext db = new LINQLocalDataContext();

            string deleteQuery = "UPDATE PCMH_SURVEYS SET DELETED='true' WHERE PCMH_SURVEY_ID='" + SurveyID + "'";
            db.ExecuteCommand(deleteQuery);

            string deleteQuery2 = "UPDATE PCMH_SURVEY_RELATED_QUESTIONS SET DELETED='true' WHERE SURVEY_ID='" + SurveyID + "'";
            db.ExecuteCommand(deleteQuery2);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    public static void DeleteQuestionThisSurvey(long QuestionID)
    {
        try
        {
            LINQLocalDataContext db = new LINQLocalDataContext();

            string deleteQuery = "UPDATE PCMH_SURVEY_RELATED_QUESTIONS SET DELETED='true' WHERE QUESTIONS_ID='" + QuestionID + "'";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

//-------------------------Generate Survey Setup------------------------//

    public class SurveyComboData
    {
        public long SurveyID { get; set; }
        public string SurveyTitle { get; set; }
        public DateTime SurDeadLine { get; set; }
    }

    [WebMethod]
    public static List<SurveyComboData> LoadSurveyInCombo()
    {
        LINQLocalDataContext db = new LINQLocalDataContext();



        var result = from survey in db.PCMH_SURVEYs
                     where survey.DELETED == false
                     select new { survey.PCMH_SURVEY_ID, survey.PCMH_SURVEY_TITLE, survey.DeadLine_Date };

        List<SurveyComboData> list = result.AsEnumerable().Select(o => new SurveyComboData { SurveyID = o.PCMH_SURVEY_ID, SurveyTitle = o.PCMH_SURVEY_TITLE, SurDeadLine = (DateTime)o.DeadLine_Date }).ToList();
        return list;
    }

    [WebMethod]
    public static List<PCMH_PROC_SEARCH_PATIENTResult> SearchPatientForSurvey(string SearchCriteria, string SearchData)
    {
        try
        {
            LINQLocalDataContext db = new LINQLocalDataContext();
            var result = db.PCMH_PROC_SEARCH_PATIENT(SearchCriteria, SearchData).ToList<PCMH_PROC_SEARCH_PATIENTResult>();
            return result;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}