var progress = 100;
$(document).ajaxStart(BlockUI).ajaxStop(UnBlockUI);

function BlockUI() {
    progress = 0;
    $("body").block({ message: "<img src='images/spinner.gif'>", css: { border: '0 Transparent', backgroundColor: 'Transparent' } })
}

function UnBlockUI() {
    progress = 100;
    $("body").unblock({ fadeOut: 200 });
}


//function BlockUI() {
//    $.blockUI( '<img src="images/spinner.gif" /> ' );
//}

//function UnBlockUI() {
//    $.unblockUI();
//}

$(function () {
    $("#btnClear").click(function () {
        totalRows = 0;
        maxPage = 0;
        doc_Info = "";
        $("#lblTotalPages").text('0');
        $("#tblBody").html("");
        var noData = "<tr id='NoRecord'><td style='color:red;font-weight:bold;text-align:center' colspan='5'>No Record Found</td></tr>"
        $("#ReportTable tbody").html(noData);
    });
});


$(function () {
    $("#txtFromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-50:+10",
    });
});

$(function () {
    $("#txtToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-50:+10",

    });
})

function isEmpty() {
    var provider = $("#ddlProCode").val();
    var loc = $("#ddlLoc").val();
    var startDate = $("#txtFromDate").val();
    var endDate = $("#txtToDate").val();

    //if (provider.length == 0) {
    //    alert("Select Provider Code");
    //    $("#ddlProCode").focus();
    //    return false;
    //}
    //if (loc.length == 0) {
    //    alert("Select Location");
    //    $("#ddlLoc").focus();
    //    return false;
    //}
    if (startDate.length == 0) {
        alert("Enter From Date");
        $("#txtFromDate").focus();
        return false;
    }
    if (endDate.length == 0) {
        alert("Enter to Date");
        $("#txtToDate").focus();
        return false;
    }
    if (Date.parse(endDate) < Date.parse(startDate)) {
        alert("'From Date' must be less than 'To Date'.");
        $("#txtFromDate").focus();
        return false;
    }
    //alert("ok");
    getRequestedReport();

}

function getRequestedReport() {
    BlockUI();
    var provider = $("#ContentPlaceHolder1_ddlProCode option:selected").val();
    var loc = $("#ContentPlaceHolder1_ddlLoc option:selected").val();
    var fromDate = $("#txtFromDate").val();
    var toDate = $("#txtToDate").val();
    debugger;
    $.ajax({
        type: "POST",
        url: "NoShowReport.aspx/GetQueryReport",
        data: '{dateFrom:"' + fromDate + '",dateTo:"' + toDate + '",Provider_Code:"' + provider + '",Location:"' + loc + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SuccessShowRateRprt,
        error: function () {
            debugger;
            alert("Error Loading Report");
        }
    });
}

function GenerateTable(data) {
    debugger;
    var res = [];
    res = data.d;
    var result = "";
    var totalAppt = 0;
    var totalNoShow = 0;
    if (res.length > 0) {
        for (var i = 0; i < res.length; i++) {
            debugger;

            totalAppt += res[i].TOTAL_APPOINTMENTS;
            totalNoShow += res[i].NO_OF_NOSHOW;
            var num3 = parseFloat((res[i].NO_OF_NOSHOW / res[i].TOTAL_APPOINTMENTS) * 100);

            result += "<tr align='center' id='rows'>";
            //Serial
            result += "<td style='border-bottom:1px solid gray'>" + (i + 1) + "</td>"
            //Date
            result += "<td style='border-bottom:1px solid gray'>" + convertDatetoString(res[i].APPOINTMENT_DATE_TIME, 2) + "</td>";
            //Total Appt
            result += "<td style='border-bottom:1px solid gray'>" + res[i].TOTAL_APPOINTMENTS + "</td>"
            //Appt Status
            result += "<td style='border-bottom:1px solid gray'>" + res[i].NO_OF_NOSHOW + "</td>";
            //Appt %
            result += "<td style='border-bottom:1px solid gray'>" + num3.toFixed(2) + "%" + "</td>";
            result += "</tr>"

        }

        result += "<tr><td></td><td></td><td style='text-align:center; color:green; font-weight:bold'>Total Appt: " + totalAppt + "</td>";
        result += "<td style='text-align:center; color:red; font-weight:bold'>Total No Show: " + totalNoShow + "</td></tr>";

        $("#tblBody").html("");
        $("#ReportTable tbody").html(result);
    }
    else
        alert("no record found");
}

function convertDatetoString(dateStr, isAM) {
    if (dateStr == "" || dateStr == null || dateStr == "null")
        return "";
    var m, day;
    jsonDate = dateStr;
    var d = new Date(parseInt(jsonDate.substr(6)));
    m = d.getMonth() + 1;
    if (m < 10)
        m = '0' + m
    if (d.getDate() < 10)
        day = '0' + d.getDate()
    else
        day = d.getDate();
    if (isAM == 'true')
        return (m + '/' + day + '/' + d.getFullYear() + ' ' + d.toLocaleTimeString())
    if (isAM == 'false')
        return (m + '/' + day + '/' + d.getFullYear() + ' ' + d.toTimeString().substr(0, 9))
    if (isAM == 2)
        return (m + '/' + day + '/' + d.getFullYear())
}