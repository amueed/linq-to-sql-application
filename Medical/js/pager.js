var doc_Info = "";
var totalRows = 0;
var rowCount = 0;
var firstRow = 0;
var curPage = 1;
var maxPage = 0;
var txtPageNo = 0
var preRowID = "";

function SuccessShowRateRprt(data) {
    debugger;
    //UnBlockUI();
    var htmlInfo = "";
    var res = data.d;
    if (res.length > 0) {

        doc_Info = data.d;
        PageNumber();

    }

    else {

        doc_Info = data.d;
        PageNumber();
    }
    if (res.length <= 0) {
        $("#CatTbl tbody").html("");
        htmlInfo = "<tr id='rowNoDataNs'><td style='color:red;font-weight:bold;' colspan='5'><span style='margin-left: 488px;'>No Record Found</span></td></tr>";
        $("#CatTbl tbody").html(htmlInfo);
    }


}

function PageNumber() {
    debugger;
    if ($("#ddl_Page").val() != null || $("#ddl_Page").val() != "") {
        totalRows = parseInt($("#ddl_Page").val());
        countPages();
    }
}

function countPages() {
    debugger;
    maxPage = parseInt(doc_Info.length);
    maxPage = Math.ceil(maxPage / totalRows);
    $("#lblTotalPages").html(maxPage);
    $("#btnFirstPage").removeAttr("disabled");
    if (maxPage == 0) {
        $("#txtCurrentPage").val("0");
    }
    else {
        $("#txtCurrentPage").val("1");
    }


    btnClick('First');
}

function btnClick(str) {
    debugger;
    txtPageNo = parseInt($("#txtCurrentPage").val());
    if (txtPageNo <= maxPage && txtPageNo > 0) {
        if (str == 'Next' && (!$('#btnNextPage').is('[disabled=disabled]'))) {
            curPage = txtPageNo + 1;
            firstRow = rowCount;
            rowCount += totalRows;
            $("#txtCurrentPage").val(curPage);
            if (maxPage > curPage) {
                $("#bntPrePage").removeAttr("disabled");
                $("#bntPrePage").attr("src", "images/i_previous_e.gif");
                $("#btnFirstPage").removeAttr("disabled");
                $("#btnFirstPage").attr("src", "images/i_first_e.gif");
            }
            else {
                $("#btnNextPage").attr("disabled", "disabled");
                $("#btnNextPage").attr("src", "images/i_next_d.gif");
                $("#btnLastPage").attr("disabled", "disabled");
                $("#btnLastPage").attr("src", "images/i_last_d.gif");
            }
            $("#btnFirstPage").removeAttr("disabled");
            $("#btnFirstPage").attr("src", "images/i_first_e.gif");
            $("#bntPrePage").removeAttr("disabled");
            $("#bntPrePage").attr("src", "images/i_previous_e.gif");
            GenerateTable();
        }
        else if (str == 'Previous' && (!$('#bntPrePage').is('[disabled=disabled]'))) {
            curPage = txtPageNo - 1;
            rowCount = firstRow;
            firstRow -= totalRows;
            $("#txtCurrentPage").val(curPage);
            if (curPage > 1) {
                $("#btnFirstPage").removeAttr("disabled");
                $("#btnFirstPage").attr("src", "images/i_first_e.gif");
                $("#bntPrePage").removeAttr("disabled");
                $("#bntPrePage").attr("src", "images/i_previous_e.gif");

            }
            else {
                $("#btnFirstPage").attr("disabled", "disabled");
                $("#btnFirstPage").attr("src", "images/i_first_d.gif");
                $("#bntPrePage").attr("disabled", "disabled");
                $("#bntPrePage").attr("src", "images/i_previous_d.gif");
            }
            $("#btnNextPage").removeAttr("disabled");
            $("#btnNextPage").attr("src", "images/i_next_e.gif");
            $("#btnLastPage").removeAttr("disabled");
            $("#btnLastPage").attr("src", "images/i_last_e.gif");
            GenerateTable();
        }
        else if (str == 'First' && (!$('#btnFirstPage').is('[disabled=disabled]'))) {
            curPage = 1;
            firstRow = 0;
            rowCount = totalRows;
            $("#txtCurrentPage").val(curPage);
            $("#btnFirstPage").attr("disabled", "disabled");
            $("#btnFirstPage").attr("src", "images/i_first_d.gif");
            $("#bntPrePage").attr("disabled", "disabled");
            $("#bntPrePage").attr("src", "images/i_previous_d.gif");

            if (rowCount >= doc_Info.length) {
                $("#btnNextPage").attr("disabled", "disabled");
                $("#btnNextPage").attr("src", "images/i_next_d.gif");
                $("#btnLastPage").attr("disabled", "disabled");
                $("#btnLastPage").attr("src", "images/i_last_d.gif");
            }
            else {
                $("#btnNextPage").removeAttr("disabled");
                $("#btnNextPage").attr("src", "images/i_next_e.gif");
                $("#btnLastPage").removeAttr("disabled");
                $("#btnLastPage").attr("src", "images/i_last_e.gif");
            }
            GenerateTable();
        }
        else if (str == 'Last' && (!$('#btnLastPage').is('[disabled=disabled]'))) {
            curPage = maxPage;
            rowCount = (curPage * totalRows);
            firstRow = rowCount - totalRows;
            $("#txtCurrentPage").val(curPage);
            $("#btnFirstPage").removeAttr("disabled");
            $("#btnFirstPage").attr("src", "images/i_first_e.gif");
            $("#bntPrePage").removeAttr("disabled");
            $("#bntPrePage").attr("src", "images/i_previous_e.gif");
            $("#btnNextPage").attr("disabled", "disabled");
            $("#btnNextPage").attr("src", "images/i_next_d.gif");
            $("#btnLastPage").attr("disabled", "disabled");
            $("#btnLastPage").attr("src", "images/i_last_d.gif");
            GenerateTable();
        }
    }
}

function GenerateTable() {
    debugger;
    var result = "";
    var rowColor = "#000000";
    var linkColor = "blue";
    var textColor = "#FFFFFF";
    if (rowCount > doc_Info.length) {
        rowCount = doc_Info.length;
    }
    if (doc_Info.length > 0) {
        for (var i = firstRow; i < rowCount; i++) {

            if(doc_Info[i].TOTAL_APPOINTMENTS !=0)
            var num3 = parseFloat((doc_Info[i].NO_OF_NOSHOW / doc_Info[i].TOTAL_APPOINTMENTS) * 100);

            result += "<tr align='center' id='rows'>";
            //Serial
            result += "<td style='border-bottom:1px solid gray'>" + (i + 1) + "</td>"
            //Date
            result += "<td style='border-bottom:1px solid gray'>" + convertDatetoString(doc_Info[i].APPOINTMENT_DATE_TIME, 2) + "</td>";
            //Total Appt
            result += "<td style='border-bottom:1px solid gray'>" + doc_Info[i].TOTAL_APPOINTMENTS + "</td>"
            //Appt Status
            result += "<td style='border-bottom:1px solid gray'>" + doc_Info[i].NO_OF_NOSHOW + "</td>";
            //Appt %
            result += "<td style='border-bottom:1px solid gray'>" + num3.toFixed(2) + "%" + "</td>";
            result += "</tr>"
        }
        $("#tblBody").html("");
        $("#ReportTable tbody").html(result);
    }
    else
        alert("no record found");
}