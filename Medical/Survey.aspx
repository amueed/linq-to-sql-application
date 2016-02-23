<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="Survey.aspx.cs" Inherits="Survey" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="css/Survey.css" rel="stylesheet" />
    <script src="js/Survey.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div id="mainDiv">
        <!-------------------Menu------------------>
        <div class="inner-menu-div">
            <ul id="inner-menu">
                <li id="li1" onclick="ChangeClass(0);" class="active"><a>Question Setup</a></li>
                <li id="li2" onclick="ChangeClass(1);"><a>Survey Setup</a></li>
                <li id="li3" onclick="ChangeClass(2);"><a>Generate Survey</a></li>
            </ul>
        </div>

        <!-------------Div for Question Setup------------->
        <div id="div-question-setup">
            <div id="inner-header-question" class="section-header">
                <span style="color:black;font-weight:bold;font-size:18px">Add New Questions</span>
            </div>
            <div class="section-body">
                <label>Questions:</label>
                <input id="txtQuestion" type="text" style="width:92%;" disabled="disabled"/>
                <br />
                <div id="SaveCancelButton" style="display:none;margin-left:85%;margin-top:10px;">
                        <input id="btnSaveQuestion" class="button" type="button" value="Save" onclick="SaveQuestion();"/>
                        <input id="btnCancel" class="button" type="button" value="Cancel" onclick="DisableQuestionSetup();"/>
                </div>

            </div>
            
  

            <div id="Div1" class="section-header">
                <span style="color:black;font-weight:bold;font-size:18px">Questions
                    <span id="EnableQuestionSetup" style="cursor:pointer;float:right;padding-right:10px" onclick="EnableQuestionSetup('new');">
                        <img src="images/max_blue.gif">&nbsp;Add</img>
                    </span>
                </span>
            </div>
            <div class="section-body">
                <div id="questions-container" style="overflow-y:auto;width:100%; height:250px; outline:1px solid gray">
                    <table id="tblQuestions" class="CustomTable">
                        <thead>
                            <tr>
                                <td width="2%"></td>
                                <td width="4%"></td>
                                <td width="8%">Action</td>
                                <td>Question</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colspan="4" style="font-weight:bold;text-align:center;color:red">No Record Found</td></tr>
                        </tbody>

                    </table>
                </div>

                </div>

        </div>
        <!-------------------------------------Div for Survey Setup-------------------------------------->
        <div id="div-suvey-setup">
            <div id="inner-header-survey" class="section-header">
                <span style="color:black;font-weight:bold;font-size:18px">Survey
                    <span style="cursor:pointer;float:right;padding-right:10px" onclick="EnableSurveySetup('new');">
                        <img src="images/max_blue.gif">&nbsp;Add</img>
                    </span>
                </span>
            </div>
            <div class="section-body">
                <label>Title:</label>
                <label>&nbsp;</label>
                <input id="txtSurveyTitle" type="text" style="width:90%;margin-left:38px;" disabled="disabled"/>
                <br /><br />
                <span style="vertical-align:top">Description:</span>
                <textarea  id="txtSurveyDescription" rows="3" style="width:90%;resize:none;" disabled="disabled"></textarea>

            <!----------------------------Load Questions Modal Start--------------------------------->
           <div id="AddQuestionInSurveyModal" title="Add Questions" style="display:none;font-size:12px;">
               <div id="Div7" style="overflow-y:auto;width:100%; height:90%; outline:1px solid gray">
                   <table id="tblAddQuestions" class="CustomTable"> 
                       <thead>
                            <tr>
                                <td width="3%"><input id="chkAllQuestions" type="checkbox" onchange="ToggleQuestions();" /></td>
                                <td>Question</td>
                            </tr>
                        </thead>
                        <tbody>
                            <!--<tr><td colspan="3" style="font-size:14px; font-weight:bold;text-align:center;color:red">No Record Found</td></tr>-->
                        </tbody>
                   </table>
               </div>
               <div id="ModalSaveCancel" style="margin-left:80%;margin-top:10px;">
                    <input id="SaveSelectedQuestion" class="button" type="button" value="Save" onclick="AddSelectedQuestions();"/>
                    <input id="CancelAddQuestion" class="button" type="button" value="Cancel" onclick="CancelAddQuestion();"/>
                </div>
           </div>
            <!----------------------------Load Questions Modal End--------------------------------->

           <div id="Div3" class="section-header">
                <span style="color:black;font-weight:bold;font-size:18px">Questions
                    <span id="AddQuestionInSurvey" style="cursor:pointer;float:right;padding-right:10px; display:none" onclick="AddQuestionInSurvey();">
                        <img src="images/max_blue.gif">&nbsp;Add</img>
                    </span>
                </span>
            </div>
            <div class="section-body">
                <div id="Div4" style="overflow-y:auto;width:100%; height:250px; outline:1px solid gray">
                    <table id="tblSurveySetupQuestions" class="CustomTable">
                        <thead>
                            <tr>
                                <td width="2%"></td>
                                <td width="5%">Action</td>
                                <td>Question</td>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>

                    </table>
                </div>
            </div>
                <div id="targetDiv" style="width:100%; height:auto;margin-top:10px;margin-bottom:20px;">
                    <label><strong>Set Target</strong></label>
                    <br />
                    <span>
                        Minimum No. of Questions for which a patient's respond should be <strong>Agree/Strongly Agree</strong>&nbsp;
                        <input type="text" id="txtTargetVal" class="input-tran" maxlength="3" style="width:40px" onkeypress="return isNumberKey(event);"/>
                        Deadline Date&nbsp;
                        <input type="text" id="txtSurveyDeadline" class="input-tran" maxlength="10" style="width:120px"/>
                    </span>
                </div>
                    <div id="SurveySetupSaveCancelButton" style="display:none;margin-left:85.5%;margin-top:10px;">
                            <input id="btnSaveSurvey" class="button" type="button" value="Save" onclick="SaveSurveySetup();"/>
                            <input id="btnCancelSurvey" class="button" type="button" value="Cancel" onclick="DisableSurveySetup();"/>
                    </div>
                
            </div>

            <div id="Div5" class="section-header" style="outline:1px solid blue">
                <span style="color:black;font-weight:bold;font-size:18px;">Surveys</span>
            </div>
            <div class="section-body">
                <div id="Div6" style="overflow-y:auto;width:100%; height:250px; outline:1px solid gray">
                    <table id="tblSurveyData" class="CustomTable">
                        <thead>
                            <tr>
                                <td width="2%"></td>
                                <td width="3%"></td>
                                <td width="8%">Action</td>
                                <td width="30%">Title</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>

                    </table>
                </div>

            </div>

        </div>

        <!------------Div for Generate Survey------------->
        <div id="div-generate-survey">
            <div id="Div2" class="section-header">
                <span style="color:black;font-weight:bold;font-size:18px">Generate Survey
                    <span style="cursor:pointer;float:right;padding-right:10px" onclick="EnableGenerateSurvey('new');">
                        <img src="images/max_blue.gif">&nbsp;Add</img>
                    </span>
                </span>
            </div>
            <div class="section-body">
                <table id="tblGenSurveyControls" height="80" border="0">
                    <tr>
                        <td style="vertical-align:middle">Surveys:</td>
                        <td style="vertical-align:middle">
                            <select id="txtGenSurveyTitle" class="input-tran" style="width:300px" disabled="disabled">
                                <option value=""></option>
                            </select>
                        </td>
                        <td style="vertical-align:middle">&nbsp;</td>
                        <td style="vertical-align:middle">Start Date:</td>
                        <td style="vertical-align:middle"><input type="text" id="txtSurveyStartDate" class="input-tran" style="width:100px" disabled="disabled"/></td>
                        <td style="vertical-align:middle">&nbsp;</td>
                        <td style="vertical-align:middle">Expiry Date:</td>
                        <td style="vertical-align:middle"><input type="text" id="txtSurveyExpirytDate" class="input-tran" style="width:100px" disabled="disabled"/></td>
                    </tr>
                    <tr>
                        <td style="vertical-align:middle">Patient(s)</td>
                        <td style="vertical-align:middle">
                            <input type="text" id="txtPatientName" class="input-tran" style="width:250px" readonly="readonly"/>
                            &nbsp;
                            <!----------------------------------------Selecl Patient Modal BEGIN---------------------------------------->
                            <div id="SeleclPatientModal" title="Patient Search" style="display:none; overflow:hidden;">
                                <div id="SearchControlsDiv" style="width:100%;height:40px;margin-top:10px">
                                    <label>Search By</label>
                                    <select id="ddlSearchWith" class="input-tran" onchange="SetPlaceHolder();">
                                        <option value="L">Last Name</option>
                                        <option value="F">First Name</option>
                                        <option value="D">Date of Birth</option>
                                        <option value="A">Account No.</option>
                                        <option value="P">Phone</option>
                                    </select>
                                    &nbsp;
                                    <input id="txtSearch" type="text" class="input-tran" style="width:250px"/>
                                    &nbsp;
                                    <input id="btnSearch" type="button" value="Search" class="button" onclick="SearchPatient();"/>
                                    <input id="btnClear" type="button" value="Clear" class="button" onclick="ClearSearchResult();"/>
                                    &nbsp;
                                    <input name="rdSearchType" type="radio" checked="checked">Begins With</input>
                                    <input name="rdSearchType" type="radio">Contains</input>
                                </div>
                                <div id="SearchDataDiv" style="width:100%;height:360px;outline:1px solid gray">
                                    <table id="tblSearchPatient" class="CustomTable" style="width:100%;">
                                        <thead>
                                            <tr><td width="2%"></td>
                                                <td width="15%">Last Name</td>
                                                <td width="15%">First Name</td>
                                                <td width="15%">Date of Birth</td>
                                                <td width="18%">Phone</td>
                                                <td>Address</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <!----------------------------------------Selecl Patient Modal END---------------------------------------->
                            <span id="SelectPatient" style="cursor:pointer; width:5px; height:5px; pointer-events:none;" onclick="SelectPatientForSurvey();"><img src="images/max_blue_highlight.gif"/></span>
                            &nbsp;
                            <span id="ClearPatient" style="cursor:pointer; width:5px; height:5px; pointer-events:none;" onclick="ClearPatientForSurvey();"><img src="images/x_blue_highlight.gif"/></span>
                        </td>
                        <td style="vertical-align:middle">&nbsp;</td>
                        <td style="vertical-align:middle" colspan="2"><input type="checkbox" id="chkAllPatients" disabled="disabled" onchange="TogglePatient();"/><span>All Patients</span></td>
                    </tr>
                </table>
            </div>
            
  

            <div id="Div8" class="section-header" style="outline:1px solid blue">
                <span style="color:black;font-weight:bold;font-size:18px;">Surveys</span>
            </div>

            <div class="section-body">
                <div id="Div9" style="overflow-y:auto;width:100%; height:250px; outline:1px solid gray">
                    <table id="tblGeneratedSurvey" class="CustomTable">
                        <thead>
                            <tr>
                                <td width="2%"></td>
                                <td width="5%">Action</td>
                                <td width="20%">Survey</td>
                                <td width="10%">Last Name</td>
                                <td width="10%">First Name</td>
                                <td width="15%">Email</td>
                                <td width="10%">Phone</td>
                                <td width="10%">Deadline Date</td>
                            </tr>
                        </thead>
                        <tbody><tr><td colspan="8" style="font-weight:bold;text-align:center;color:red">No Record Found</td></tr></tbody>
                    </table>
                </div>

                </div>
                <div id="GenerateCancelSurvey" style="display:none; margin-left:86.4%; margin-top:10px;">
                        <input id="btnGenerateSurvey" class="button" type="button" value="Save" onclick="GenerateSurvey();"/>
                        <input id="btnCancelGenerate" class="button" type="button" value="Cancel" onclick="DisableGenerateSurvey();"/>
                </div>
        </div>
    </div>

</asp:Content>

