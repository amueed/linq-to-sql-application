<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="NoShowReport.aspx.cs" Inherits="NoShowReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="js/NoShowReport.js"></script>
    <script src="js/pager.js"></script>
    <link href="css/NoShowReport.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="mainDiv">

        <div id="criteriaDiv">
            <div class="Heading">No Show Appointment Report - Criteria</div>
            <table id="tblCriteria" align="center" cellpadding="5" cellspacing="5">
                <tr>
                    <td>Provider Code*:</td>
                    <td>
                        <select id="ddlProCode" style="width: 180px" class="input-tran" runat="server">
                        </select>
                    </td>
                    <td>&nbsp;</td>
                    <td>Location*:</td>
                    <td>
                        <select id="ddlLoc" style="width: 180px" class="input-tran" runat="server">
                        </select>

                    </td>
                </tr>
                <tr>
                    <td>From*:</td>
                    <td>
                        <input id="txtFromDate" type="text" maxlength="10" class="input-tran" /></td>
                    <td>&nbsp;</td>
                    <td>To*:</td>
                    <td>
                        <input id="txtToDate" type="text" maxlength="10" class="input-tran" /></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>
                        <input id="btnSearch" value="Search" type="button" class="button" onclick="return isEmpty();" />
                        &nbsp;
                        <input id="btnClear" value="Clear" type="reset" class="button" />
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>


        <div id="pager" style="height:auto; padding:3px; outline:1px solid gray">
                <span>
                    <span id="spnFirstPage">
                        <img id="btnFirstPage" style="cursor: pointer;" alt="First Page" src="images/i_first_e.gif" title="First Page" onclick="btnClick('First')" /></span><span id="spnPrePage"><img id="bntPrePage" style="cursor: pointer;" alt="Previous Page" src="images/i_previous_e.gif" title="Previous Page" onclick="btnClick('Previous')" />
                    </span>
                    <span id="spnCurrentPage">
                        <input type="text" id="txtCurrentPage" value="0" readonly="readonly" style="text-align: center;width:25px" class="input-trans"/>
                    </span>
                    <span id="lblTotalPages">0</span>
                    <span id="spnNextPage">
                        <img id="btnNextPage" style="cursor: pointer;" alt="Next Page" src="images/i_next_e.gif" title="Next Page" onclick="btnClick('Next')" />
                    </span>
                    <span id="spnLastPage">
                        <img id="btnLastPage" style="cursor: pointer;" alt="Last Page" src="images/i_last_e.gif" title="Last Page" onclick="btnClick('Last')" />
                    </span>

                    <label id="lbl_record" style="padding:2px">
                        <label>Showing</label>
                            <select id="ddl_Page" onchange="PageNumber()" style="width: 55px;" class="input-trans">
                                <option selected="selected" value="10">10</option>
                                <option value="30">30</option>
                                <option value="60">60</option>
                                <option value="90">90</option>
                                <option value="120">120</option>
                                <option value="150">150</option>
                                <option value="180">180</option>
                            </select>
                        <label>Per Page</label>
                    </label>
                </span>
            </div>

        
        <div id="reportDiv">
            <div class="Heading">Report</div>
            <div id="rptBackground" style="position:relative; overflow-x:auto;">
                <table border="0" cellpadding="5" width="100%" id="ReportTable">
                    <thead style="color: black; text-align: center; font-weight: bold;">
                        <tr>
                            <td style='border-bottom: 1px solid black'>Sr. No</td>
                            <td style='border-bottom: 1px solid black'>Date</td>
                            <td style='border-bottom: 1px solid black'>Total Scheduled Appts</td>
                            <td style='border-bottom: 1px solid black'>Number of No-Show Appts</td>
                            <td style='border-bottom: 1px solid black'>Rate of No-Show Appts.(%)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="NoRecord">
                            <td style="color: red; font-weight: bold; text-align: center" colspan="5">No Record Found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</asp:Content>

