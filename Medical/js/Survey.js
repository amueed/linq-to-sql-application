var isNew = false;
var isModify = false;

var GlobalQuestionID = "";
var GlobalQuestionsData = "";

var GlobalSurveyID = "";

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var CurrentDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + d.getFullYear();


$(document).ready(function () {
    $('#div-question-setup').show();
    $('#div-suvey-setup').hide();
    $('#div-generate-survey').hide();

    LoadQuestionInTable();
});

function ChangeClass(index) {
    if (index == '0') {

        isNew = false;
        isModify = false;

        $('#li1').addClass('active');
        $('#li2').removeClass('active');
        $('#li3').removeClass('active');

        $('#div-question-setup').show();
        $('#div-suvey-setup').hide();
        $('#div-generate-survey').hide();

        DisableQuestionSetup();
        DisableSurveySetup();
        DisableGenerateSurvey();

    } else if (index == '1') {

        isNew = false;
        isModify = false;

        $('#li1').removeClass('active');
        $('#li2').addClass('active');
        $('#li3').removeClass('active');

        $('#div-question-setup').hide();
        $('#div-suvey-setup').show();
        $('#div-generate-survey').hide();

        DisableQuestionSetup();
        DisableSurveySetup();
        DisableGenerateSurvey();

        LoadSurveyInTable();

    } else if (index == '2') {

        isNew = false;
        isModify = false;

        $('#li1').removeClass('active');
        $('#li2').removeClass('active');
        $('#li3').addClass('active');

        $('#div-question-setup').hide();
        $('#div-suvey-setup').hide();
        $('#div-generate-survey').show();

        DisableQuestionSetup();
        DisableSurveySetup();
        DisableGenerateSurvey();

        LoadSurveyInCombo();
    }
}

function convertDatetoString(dateStr, isAM) {
    debugger;
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

function ToolTip(creadtedby, createdDate, modby, moddate) {
    debugger;
    var tbl = "";
    tbl += "<table class='tooltip' style='background-color:#FFFFBF;'>";
    tbl += "<tr><td style='padding:5px 5px 5px 10px;'>Created By:</td><td style='padding:5px 10px 5px 5px;'><b> " + creadtedby + " </b></td></tr>";
    tbl += "<tr> <td style='padding:5px  5px 5px 10px;'>Created Date:</td><td style='padding:5px 10px 5px 5px;'><b> " + createdDate.replace(/-/g, '/') + " </b></td></tr>";
    tbl += "<tr><td style='padding:5px 5px 5px 10px;'>Modified By:</td><td style='padding:5px 10px 5px 5px;'><b> " + modby + " </b></td></tr>";
    tbl += "<tr> <td style='padding:5px  5px 5px 10px;'>Modified Date:</td><td style='padding:5px 10px 5px 5px;'><b> " + moddate.replace(/-/g, '/') + " </b></td></tr>";
    tbl += "</table>";
    return overlib(tbl);
}

function isNumberKey(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode < 48 || charCode > 57) {
        alert("This field accept digits only.");
        return false;
    }

    return true;
}

//--------------------------Questions Setup---------------------------//

function EnableQuestionSetup(check) {

    if (check == 'new') {
        isNew = true;
        $('#txtQuestion').prop('disabled', false);
        $('#txtQuestion').val('');
        $('#txtQuestion').focus();

        $('#SaveCancelButton').show();

        $("#tblQuestions tr").removeClass("SelectedRow");
        $("#tblQuestions").css('pointer-events', 'none');
    }
    else if (check = 'edit')
        isModify = true;


}

function DisableQuestionSetup() {
    isNew = false;
    isModify = false;
    $('#SaveCancelButton').hide();
    $("#txtQuestion").val("");
    $('#txtQuestion').prop('disabled', true);
    $('#EnableQuestionSetup').css('pointer-events', 'auto');
    $("#tblQuestions").css('pointer-events', 'auto');

    $("#tblQuestions tr").removeClass("SelectedRow");
}

function SaveQuestion() {
    debugger;
    var question = $.trim($('#txtQuestion').val());
    var isEmpty = false;
    var isExist = false;

    if (question == null || question == '') {
        alert("Please enter the question.");
        $('#txtQuestion').focus();
        isEmpty = true;
        return;
    }

    $("tr[id*='row_']").each(function () {
        if ($(this).find('td:eq(4)').text().trim().toLowerCase() == question.toLowerCase()) {
            alert("Question already Exists.");
            $('#txtQuestion').focus();
            isExist = true;
            return;
        }
    });

    if (isNew == true && isEmpty == false && isExist == false) {
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Survey.aspx/SaveQuestion",
            data: "{'Question':'" + question + "'}",
            async: false,
            dataType: "json",
            success: SaveQuestionResult,
            error: function () {
                alert("Error");
            }
        });

    } else if (isModify == true && isEmpty == false && isExist == false) {
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Survey.aspx/UpdateQuestion",
            data: "{'QuestionID':'" + GlobalQuestionID + "', 'Question':'" + question + "'}",
            async: false,
            dataType: "json",
            success: SaveQuestionResult,
            error: function () {
                alert("Error");
            }
        });
    }
}

function SaveQuestionResult(data) {
    //document.location.reload();
    DisableQuestionSetup();
    LoadQuestionInTable();

}

function LoadQuestionInTable() {
       $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: "Survey.aspx/LoadQuestions",
        async: false,
        dataType: "json",
        success: LoadQuestionsSuccess,
        error: function () {
            alert("Error");
        }
    });
}

function LoadQuestionsSuccess(data) {
    GlobalQuestionsData = data;
    var result = data.d;
    var htmlData = '';
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {

            var row_id = "row_" + result[i].PCMH_QUESTIONS_ID;
            //var tool_tip = "ToolTip(" + result[i].CREATED_BY + ", " + convertDatetoString(result[i].CREATED_DATE, 2) + ", " + result[i].MODIFIED_BY + ", " + convertDatetoString(result[i].MODIFIED_DATE, 2) + ")";

            htmlData += "<tr id=" + row_id + " onclick='SelectQuestion(" + row_id + ")' style='cursor:pointer;'>";
            htmlData += "<td style='display:none'>" + result[i].PCMH_QUESTIONS_ID + "</td>";
            htmlData += "<td></td>"
            htmlData += "<td><span class='info' onmouseover=''></span></td>";
            htmlData += "<td><span class='edit' title='Edit' onclick='EditQuestion(" + row_id + ")'>&nbsp;</span><span class='delete' title='Delete' onclick='DeleteQuestion(" + row_id + ")'>&nbsp;</span></td>";
            htmlData += "<td>" + result[i].PCMH_QUESTION + "</td>";
            htmlData += "</tr>";
        }
        $('#tblQuestions tbody').html(htmlData);
    }
}

function SelectQuestion(index) {
    if (isNew == false && isModify == false) {
        $("#tblQuestions tr").removeClass("SelectedRow");
        $("#tblQuestions").find(index).addClass("SelectedRow");
        $("#txtQuestion").val($("#tblQuestions").find(index).find("td:eq(4)").text());
    }
}

function EditQuestion(index) {
    isModify = true;
    GlobalQuestionID = $("#tblQuestions").find(index).find("td:eq(0)").text();
    //alert(GlobalQuestionID);
    $("#txtQuestion").attr("disabled", false);
    $("#txtQuestion").focus();
    $("#tblQuestions tr").removeClass("SelectedRow");
    $("#tblQuestions").find(index).addClass("SelectedRow");
    $("#txtQuestion").val($("#tblQuestions").find(index).find("td:eq(4)").text());
    $('#SaveCancelButton').show();
    $('#EnableQuestionSetup').css('pointer-events', 'none');
}

function DeleteQuestion(index) {
    if (isNew == false && isModify == false) {
        var ask = confirm("Are you sure?");
        if (ask) {
            GlobalQuestionID = $("#tblQuestions").find(index).find("td:eq(0)").text();
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "Survey.aspx/DeleteQuestion",
                data: "{'QuestionID':'" + GlobalQuestionID + "'}",
                async: false,
                dataType: "json",
                success: SaveQuestionResult,
                error: function () {
                    alert("Error");
                }
            });
        }
    }
}

//--------------------Survey Setup----------------------//

$(function () {
    $("#txtSurveyDeadline").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-0:+10",
        minDate: '0',
        dateFormat: "mm/dd/yy",
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 12);
        }
    });
});

function EnableSurveySetup(check) {

    if (check == 'new') {
        isNew = true;
        $('#SurveySetupSaveCancelButton').show();
        $('#AddQuestionInSurvey').show();
        $('#txtSurveyTitle').attr('disabled', false);
        $('#txtSurveyDescription').attr('disabled', false);
        $('#txtTargetVal').attr('disabled', false);
        $('#txtSurveyDeadline').attr('disabled', false);

        $('#txtSurveyTitle').val('');
        $('#txtSurveyDescription').val('');
        $('#txtTargetVal').val('');
        $('#txtSurveyDeadline').val('');

        $("#tblSurveySetupQuestions tbody").html("");
        $("#tblSurveyData tr").removeClass("SelectedRow");


    }
    else if (check = 'edit')
        isModify = true;
}

function SaveSurveySetup() {
    debugger;
    var isExist = false;
    var Title = $('#txtSurveyTitle').val();
    var Description = $('#txtSurveyDescription').val();

    var SurveyTitle = $.trim($('#txtSurveyTitle').val());
    var SurDescription = $.trim($('#txtSurveyDescription').val());
    var SurTarget = $.trim($('#txtTargetVal').val());
    var SurDeadLine = $.trim($('#txtSurveyDeadline').val());

    if (SurveyTitle == "" || SurveyTitle == null) {
        alert("Please Enter Survey Title");
        $('#txtSurveyTitle').focus();
        return;
    }
    if (SurDescription == "" || SurDescription == null) {
        alert("Please Enter Survey Description");
        $('#txtSurveyDescription').focus();
        return;
    }
    if (SurTarget == "" || SurTarget == null) {
        alert("Please set survey target.");
        $('#txtTargetVal').focus();
        return;
    }
    if (SurDeadLine == "" || SurDeadLine == null) {
        alert("Please set survey deadline date.");
        $('#txtSurveyDeadline').focus();
        return;
    }
    if ($('#tblSurveySetupQuestions tbody tr').length <=1) {
        alert("Please select some questions for survey.");
        AddQuestionInSurvey();
        return;
    }
    if (Date.parse(SurDeadLine) < Date.parse(CurrentDate)) {
        alert("Dead Line Date must be greater than Current Date.");
        $('#txtSurveyDeadline').focus();
        return;
    }
    if (SurTarget > $("#tblSurveySetupQuestions tbody tr").length) {
        alert("Target Value must be less than total no. of questions in survey.");
        $('#txtTargetVal').focus();
        return;
    }
    $("#tblSurveyData tbody tr").each(function () {
        if ($(this).find('td:eq(4)').text().trim().toLowerCase() == SurveyTitle.toLowerCase() && isNew == true) {
            alert("This survey title already Exists. Please try diffrent.");
            $('#txtSurveyTitle').focus();
            isExist = true;
            return;
        }
    })

    var QuestionArray = "";
    for (var i = 0; i < $("#tblSurveySetupQuestions tbody tr").length; i++) {
        QuestionArray += $("#tblSurveySetupQuestions tbody tr:eq(" + i + ") td:eq(0)").text()+ ",";
    }

    if (isNew == true && isExist == false) {
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Survey.aspx/SaveSurvey",
            data: "{'SurveyTitle':'" + Title + "', 'SurveyDesc':'" + Description + "', 'SurveyTarget':'" + SurTarget + "', 'SurveyDeadline':'" + SurDeadLine + "', 'QuestionArray':'" + QuestionArray + "'}",
            async: false,
            dataType: "json",
            success: SaveSurveySetupSuccess,
            error: function () {
                alert("Error");
            }
        });
    }

    //if (isModify == true && isExist == false) {
    //    $.ajax({
    //        type: "Post",
    //        contentType: "application/json; charset=utf-8",
    //        url: "Survey.aspx/SaveQuestion",
    //        data: "{'Question':'" + question + "'}",
    //        async: false,
    //        dataType: "json",
    //        success: SaveQuestionResult,
    //        error: function () {
    //            alert("Error");
    //        }
    //    });
    //}
}

function SaveSurveySetupSuccess() {
    DisableSurveySetup();
    LoadSurveyInTable();
}

function LoadSurveyInTable() {
    debugger;
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: "Survey.aspx/LoadSurvey",
        async: false,
        dataType: "json",
        success: LoadSurveySuccess,
        error: function () {
            alert("Error Loading Survey Data");
        }
    });
}

function LoadSurveySuccess(data) {
    debugger;
    var SurveyData = data.d;
    var htmlData = "";

    if (SurveyData.length > 0) {
        for (var i = 0; i < SurveyData.length; i++) {
            var SurveyID = SurveyData[i].PCMH_SURVEY_ID;
            var Title = SurveyData[i].PCMH_SURVEY_TITLE;
            var Desc = SurveyData[i].PCMH_SURVEY_DESCRIPTION;
            var Target = SurveyData[i].PCMH_Target;
            var DeadLine = convertDatetoString(SurveyData[i].DeadLine_Date, 2);

            var RowID = 'row_' + SurveyID;

            htmlData += "<tr id=" + RowID + " onclick='SelectThisRow(" + RowID + "," + SurveyID + ")' style='cursor:pointer;'>";
            htmlData += "<td style='display:none'>" + SurveyID + "</td>";
            htmlData += "<td></td>";
            htmlData += "<td><span class='info' onmouseover=''></span></td>";
            htmlData += "<td><span class='edit' title='Edit' onclick='EditThisSurvey(" + SurveyID + "," + RowID + ");'></span><span class='delete' title='Delete' onclick='DeleteThisSurvey(" + SurveyID + "," + RowID + ");'>&nbsp;</span></td>";
            htmlData += "<td>" + Title + "</td>";
            htmlData += "<td>" + Desc + "</td>";
            htmlData += "<td style='display:none'>" + Target + "</td>";
            htmlData += "<td style='display:none'>" + DeadLine + "</td>";
            htmlData += "</tr>";
        }

        $("#tblSurveyData tbody").html(htmlData);
    }
    else {
        htmlData = '<tr><td colspan="5" style="font-weight:bold;text-align:center;color:red">No Record Found</td></tr>';
        $("#tblSurveyData tbody").html(htmlData);
    }


}

function EditThisSurvey(ID, index) {
    debugger;
    isModify = true;
    isNew = false;
    $('#SurveySetupSaveCancelButton').show();
    $('#AddQuestionInSurvey').show();
    $('#txtSurveyTitle').attr('disabled', false);
    $('#txtSurveyDescription').attr('disabled', false);
    $('#txtTargetVal').attr('disabled', false);
    $('#txtSurveyDeadline').attr('disabled', false);

    LoadQuestionsOfThisSurvey(ID);

    $('#txtSurveyTitle').val($("#tblSurveyData tbody").find(index).find("td:eq(4)").text());
    $('#txtSurveyDescription').val($("#tblSurveyData tbody").find(index).find("td:eq(5)").text());
    $('#txtTargetVal').val($("#tblSurveyData tbody").find(index).find("td:eq(6)").text());
    $('#txtSurveyDeadline').val($("#tblSurveyData tbody").find(index).find("td:eq(7)").text());

    $("#tblSurveyData tr").removeClass("SelectedRow");
    $("#tblSurveyData").find(index).addClass("SelectedRow");

    $("#tblSurveySetupQuestions tbody").css("pointer-events", "auto");
}

function DeleteQuestionThisSurvey(ID,index) {
    if (isModify == true) {
        var ask = confirm("Are you sure?");
        if (ask) {
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "Survey.aspx/DeleteQuestionThisSurvey",
                data: "{'QuestionID':'" + ID + "'}",
                async: false,
                dataType: "json",
                success: function () {
                    alert("deleted");
                    $("#tblSurveySetupQuestions tbody").find(index).remove();
                },
                error: function () {
                    alert("Error");
                }
            });
        }
    }
}

function DeleteThisSurvey(ID) {
    debugger;
    if (isNew == false && isModify == false) {
        var ask = confirm("Are you sure?");
        if (ask) {
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "Survey.aspx/DeleteThisSurvey",
                data: "{'SurveyID':'" + ID + "'}",
                async: false,
                dataType: "json",
                success: function () {
                    LoadSurveyInTable();
                    $('#txtSurveyTitle').val('');
                    $('#txtSurveyDescription').val('');
                    $('#txtTargetVal').val('');
                    $('#txtSurveyDeadline').val('');
                    $("#tblSurveySetupQuestions tbody").html("");
                },
                error: function () {
                    alert("Error");
                }
            });
        }
    }
}

function SelectThisRow(index, SurveyID) {
    debugger;
    if (isNew == false && isModify == false) {

        $("#tblSurveyData tr").removeClass("SelectedRow");
        $("#tblSurveyData").find(index).addClass("SelectedRow");

        $("#txtSurveyTitle").val($("#tblSurveyData").find(index).find("td:eq(4)").text());
        $("#txtSurveyDescription").val($("#tblSurveyData").find(index).find("td:eq(5)").text());
        $("#txtTargetVal").val($("#tblSurveyData").find(index).find("td:eq(6)").text());
        $("#txtSurveyDeadline").val($("#tblSurveyData").find(index).find("td:eq(7)").text());

        LoadQuestionsOfThisSurvey(SurveyID);
    }
}

function LoadQuestionsOfThisSurvey(ID) {
    debugger;
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: "Survey.aspx/LoadQuestionsOfThisSurvey",
        data: "{'SurveyID':'" + ID + "'}",
        async: false,
        dataType: "json",
        success: LoadQuestionsOfThisSurveySuccess,
        error: function () {
            alert("Error");
        }
    });
}

function LoadQuestionsOfThisSurveySuccess(data) {
    debugger;
    var result = data.d;
    var ID = "";
    var Question = "";
    var htmlDate = "";
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            ID = result[i].ID;
            Question = result[i].QUESTION;

            htmlDate += "<tr id='" + ID + "' style='cursor:text'>";
            htmlDate += "<td style='display:none'>" + ID + "</td>";
            htmlDate += "<td></td>";
            htmlDate += "<td><span class='delete' title='Delete' onclick='DeleteQuestionThisSurvey(" + ID + ")'></span></td>";
            htmlDate += "<td>" + Question + "</td>";
            htmlDate += "</tr>";
        }
    }
    $("#tblSurveySetupQuestions tbody").html(htmlDate);
    $("#tblSurveySetupQuestions tbody").css("pointer-events", "none");
}

function DisableSurveySetup() {
    isNew = false;
    isModify = false;
    $('#SurveySetupSaveCancelButton').hide();
    $('#AddQuestionInSurvey').hide();
    $('#txtSurveyTitle').attr('disabled', true);
    $('#txtSurveyDescription').attr('disabled', true);
    $('#txtTargetVal').attr('disabled', true);
    $('#txtSurveyDeadline').attr('disabled', true);

    $('#txtSurveyTitle').val('');
    $('#txtSurveyDescription').val('');
    $('#txtTargetVal').val('');
    $('#txtSurveyDeadline').val('');

    $("#tblSurveySetupQuestions tbody").html("");
    $("#tblSurveyData tr").removeClass("SelectedRow");
}

function AddQuestionInSurvey() {
    $('#AddQuestionInSurveyModal').dialog({
        resizable: false,
        draggable: false,
        closeOnEscape: true,
        modal: true,
        width: '900',
        height: '500',
        show: 'fade',
        hide: 'fade',
        open: function () {
            $('.ui-widget-header').css({ 'font-size': '12px', 'color': '#fff' });
            $('.ui-dialog-titlebar').css({ 'background-color': '#2f2f2f', 'background-image': 'none' });
            $('.ui-dialog').css({ 'border-width': '7px', 'border-color': 'gray', 'border-style': 'solid', 'border-radius': '5px' });
        }
    });
    LoadQuestionInSurveyModal();
}

function AddSelectedQuestions() {
    debugger;
    var ID = "";
    var Question = "";
    var htmlDate = "";
    for (var i = 0; i < $('#AddQuestionInSurveyModal tbody tr').length; i++) {
        if ($("#AddQuestionInSurveyModal tbody tr:eq(" + i + ") td:eq(1) input[type=checkbox]").is(":checked")) {
            ID = $("#AddQuestionInSurveyModal tbody tr:eq(" + i + ") td:eq(0)").text();
            Question = $("#AddQuestionInSurveyModal tbody tr:eq(" + i + ") td:eq(2)").text();

            htmlDate += "<tr id='" + ID + "'>";
            htmlDate += "<td style='display:none'>" + ID + "</td>";
            htmlDate += "<td></td>";
            htmlDate += "<td><span class='delete' onclick='DeleteSurveyQuestion("+ID+")'></span></td>";
            htmlDate += "<td>" + Question + "</td>";
            htmlDate += "</tr>";
        }
    }
    $("#tblSurveySetupQuestions tbody").html(htmlDate);

    $('#AddQuestionInSurveyModal').dialog('close');
}

function DeleteSurveyQuestion(ID) {
    debugger;
    var ask = confirm("Are you sure?");
    if (ask) {
        $("#tblSurveySetupQuestions tbody tr[id='" + ID + "']").html('');
    }
}

function LoadQuestionInSurveyModal() {
    debugger;
    var result = GlobalQuestionsData.d;
    var htmlData = '';
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {

            var row_id = "row_" + result[i].PCMH_QUESTIONS_ID;
            var chk_id = "chk_" + result[i].PCMH_QUESTIONS_ID;
            htmlData += "<tr id=" + row_id + " style='cursor:text;'>";
            htmlData += "<td style='display:none'>" + result[i].PCMH_QUESTIONS_ID + "</td>";
            htmlData += "<td><input id=" + chk_id + " type='checkbox'></td>";
            htmlData += "<td>" + result[i].PCMH_QUESTION + "</td>";
            htmlData += "</tr>";
        }
        $('#tblAddQuestions tbody').html(htmlData);
    }
    else {
        htmlData = '<tr><td colspan="3" style="font-size:14px; font-weight:bold;text-align:center;color:red">No Record Found</td>';
        $('#tblAddQuestions tbody').html(htmlData);
    }
    
}

function ToggleQuestions() {
    debugger;
    if ($('#chkAllQuestions').is(':checked')) {
        $("#tblAddQuestions tbody tr").each(function () {
            $(this).find('td:eq(1)').find('input[type="checkbox"]').prop('checked', true);
        });
    }
    else {
        $("#tblAddQuestions tbody tr").each(function () {
            $(this).find('td:eq(1)').find('input[type="checkbox"]').prop('checked', false);
        })
    }
}

function CancelAddQuestion() {
    $('#AddQuestionInSurveyModal').dialog('close');
}

//--------------------Generate Survey----------------------//

$(function () {
    $("#txtSurveyStartDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-0:+10",
        minDate: '0',
        dateFormat: "mm/dd/yy",
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 12);
        }
    });
});

$(function () {
    $("#txtSurveyExpirytDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-0:+10",
        minDate: '0',
        dateFormat: "mm/dd/yy",
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 12);
        }
    });
});

function LoadSurveyInCombo() {
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: "Survey.aspx/LoadSurveyInCombo",
        async: false,
        dataType: "json",
        success: LoadSurveyInComboSuccess,
        error: function () {
            alert("Error");
        }
    });
}

function LoadSurveyInComboSuccess(data) {
    debugger;
    var result = data.d;
    var SurID = "";
    var SurTitle = "";
    var SurDeadLine = "";
    var htmlData = "<option value=''></option>";

    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            SurID = result[i].SurveyID;
            SurTitle = result[i].SurveyTitle;
            SurDeadLine = convertDatetoString(result[i].SurDeadLine, 2);

            htmlData += "<option value=" + SurID + " DeadLine=" + SurDeadLine + ">" + SurTitle + "</option>";
        }
        $("#txtGenSurveyTitle").html(htmlData);
    }
}

function EnableGenerateSurvey(check) {

    if (check == 'new')
        isNew = true;
    else if (check = 'edit')
        isModify = true;

    $('#GenerateCancelSurvey').show();
    $('#txtGenSurveyTitle').attr('disabled', false);
    $('#txtSurveyStartDate').attr('disabled', false);
    $('#txtSurveyExpirytDate').attr('disabled', false);
    $('#chkAllPatients').attr('disabled', false);
    $('#SelectPatient').css('pointer-events', 'auto');
    $('#ClearPatient').css('pointer-events', 'auto');
    $('#txtGenSurveyTitle').val('');
    $('#txtSurveyStartDate').val('');
    $('#txtSurveyExpirytDate').val('');
    $('#txtPatientName').val('');
    $('#chkAllPatients').attr('checked', false);
}

function GenerateSurvey() {
    debugger;

    var EverythingIsOK = true;

    var GenSurveyTitle = $("#txtGenSurveyTitle option:selected").val();
    var GenStartDate = $.trim($('#txtSurveyStartDate').val());
    var GenExpiryDate = $.trim($('#txtSurveyExpirytDate').val());
    var GenPatientName = $('#txtPatientName').val();
    var GenAllPatient = false;
    var DeadLine = $("#txtGenSurveyTitle option:selected").attr("DeadLine");

    if (GenSurveyTitle == "") {
        alert("Select a Survey for Generation.");
        $("#txtGenSurveyTitle").focus();
        EverythingIsOK = false;
        return;
    }
    if (GenStartDate == "") {
        alert("Select a Survey Start Date.");
        $("#txtSurveyStartDate").focus();
        EverythingIsOK = false;
        return;
    }
    if (GenExpiryDate == "") {
        alert("Select a Survey Expiry Date.");
        $("#txtSurveyExpirytDate").focus();
        EverythingIsOK = false;
        return;
    }
    if ($("#chkAllPatients").is(":checked")) {
        GenAllPatient = true;
    }
    if (GenPatientName == "" && GenAllPatient == false) {
        alert("Please provide patient(s) for survey.");
        EverythingIsOK = false;
        SelectPatientForSurvey();
        return;
    }
    if (Date.parse(CurrentDate) > Date.parse(GenStartDate)) {
        alert("Select a start date greater or equal to current date.");
        $("#txtSurveyStartDate").focus();
        EverythingIsOK = false;
        return;
    }
    if (Date.parse(GenExpiryDate) < Date.parse(GenStartDate)) {
        alert("Select expiry date greater or equal to start date");
        $("#txtSurveyExpirytDate").focus();
        EverythingIsOK = false;
        return;
    }
    if (Date.parse(DeadLine) < Date.parse(GenExpiryDate)) {
        alert("Please select expiry date earlier than deadline date. DeadLine Date:" + DeadLine);
        $("#txtSurveyExpirytDate").focus();
        EverythingIsOK = false;
        return;
    }
    if (Date.parse(DeadLine) < Date.parse(CurrentDate)) {
        alert("This Survey has been expired. Expiry Date:" + DeadLine);
        $("#txtGenSurveyTitle").focus();
        EverythingIsOK = false;
        return;
    }

    if (EverythingIsOK) {
        alert("OK");
    }
}

function TogglePatient() {
    debugger;
    if ($('#chkAllPatients').is(':checked')) {
        $("#SelectPatient").css("pointer-events","none");
        $("#ClearPatient").css("pointer-events", "none");
    }
    else {
        $("#SelectPatient").css("pointer-events", "auto");
        $("#ClearPatient").css("pointer-events", "auto");
    }
}

function DisableGenerateSurvey() {

    isNew = false;
    isModify = false;

    $('#GenerateCancelSurvey').hide();
    $('#txtGenSurveyTitle').attr('disabled', true);
    $('#txtSurveyStartDate').attr('disabled', true);
    $('#txtSurveyExpirytDate').attr('disabled', true);
    $('#chkAllPatients').attr('disabled', true);
    $('#SelectPatient').css('pointer-events', 'none');
    $('#ClearPatient').css('pointer-events', 'none');
    $('#txtGenSurveyTitle').val('');
    $('#txtSurveyStartDate').val('');
    $('#txtSurveyExpirytDate').val('');
    $('#txtPatientName').val('');
    $('#chkAllPatients').attr('checked', false);
}

function SelectPatientForSurvey() {
    if ($("#txtGenSurveyTitle option:selected").text() == "") {
        alert("Please select survey title first.");
        $("#txtGenSurveyTitle").focus();
        return;
    }

    $('#SeleclPatientModal').dialog({
        resizable: false,
        draggable: false,
        closeOnEscape: true,
        modal: true,
        width: '800',
        height: '480',
        show: 'fade',
        hide: 'fade',
        open: function () {
            $('.ui-widget').css('font-size', '12px');
            $('.ui-widget-header').css({ 'font-size': '12px', 'color': '#fff' });
            $('.ui-dialog-titlebar').css({ 'background-color': '#2f2f2f', 'background-image': 'none' });
            $('.ui-dialog').css({'border-width': '7px', 'border-color': 'gray', 'border-style': 'solid', 'border-radius': '5px'});
        }
    });
    ClearSearchResult();
}

function ClearPatientForSurvey() {
    debugger;
    $('#txtPatientName').val('');
    $("#tblGeneratedSurvey tbody tr[type=recent]").html("");
    $("#chkAllPatients").prop("disabled", false);
}

//-----Patient Search Begin------//

function SetPlaceHolder() {
    debugger;
    var Criteria = $("#ddlSearchWith option:selected").val();
    var PlaceHolder = "";
    switch (Criteria) {
        case "L":
            PlaceHolder = "Enter Patient's Last Name";
            break;
        case "F":
            PlaceHolder = "Enter Patient's First Name";
            break;
        case "D":
            PlaceHolder = "Enter Patient's Date of Birth";
            break;
        case "A":
            PlaceHolder = "Enter Patient's Account Number";
            break;
        case "P":
            PlaceHolder = "Enter Patient's Home Phone Number";
            break;
    }
    $("#txtSearch").attr("placeholder", PlaceHolder);
}

function SearchPatient() {
    debugger;
    var data = "";
    var SC = "";
    data = $("#txtSearch").val();
    SC = $("#ddlSearchWith option:selected").val();
    if ($.trim(data) == "" || $.trim(data) == null) {
        alert("Enter Some Data to Search");
        $("#txtSearch").focus();
        return;
    }
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: "Survey.aspx/SearchPatientForSurvey",
        data: "{'SearchCriteria':'" + SC + "','SearchData':'" + data + "'}",
        async: false,
        dataType: "json",
        success: SearchPatientSuccess,
        error: function () {
            alert("Error");
        }
    });
}

function SearchPatientSuccess(data) {
    debugger;
    var result = data.d;
    var htmlData = "";
    var rowID = "";
    var PatientID = "";
    if (result.length > 0) {
        for (var i = 0 ; i < result.length; i++) {
            rowID = "row" + result[i].Patient_Account;
            PatientID = result[i].Patient_Account;

            htmlData += "<tr id=" + rowID + " style='cursor:pointer; font-size:12px' onclick='SelectThisPatient(" + rowID + ")'>";
            htmlData += "<td style='display:none'>" + PatientID + "</td>";
            htmlData += "<td></td>";
            htmlData += "<td>" + result[i].Last_Name + "</td>";
            htmlData += "<td>" + result[i].First_Name + "</td>";
            htmlData += "<td style='text-align:center'>" + convertDatetoString(result[i].Date_Of_Birth, 2) + "</td>";
            htmlData += "<td style='text-align:center'>" + result[i].Home_Phone + "</td>";
            htmlData += "<td>" + result[i].Address + "</td>";
            htmlData += "</tr>";
        }
        $("#tblSearchPatient tbody").html(htmlData);
    }
    else {
        $("#tblSearchPatient tbody").html("<tr><td colspan='6' style='font-size:12px;color:red;text-align:center'>No Record Found</td></tr>");
    }
}

function ClearSearchResult() {
    $("#ddlSearchWith").val($("#ddlSearchWith option:first").val());
    $("#txtSearch").val("");
    $("#tblSearchPatient tbody").html("");
    SetPlaceHolder();
}

function SelectThisPatient(index) {
    debugger;
    var patID = "";
    var Lname = "";
    var Fname = "";
    var email = "";
    var ph = "";
    var deadline = "";
    var currentDate = "";
    patID = $("#tblSearchPatient tbody").find(index).find("td:eq(0)").text();
    Lname = $("#tblSearchPatient tbody").find(index).find("td:eq(2)").text();
    Fname = $("#tblSearchPatient tbody").find(index).find("td:eq(3)").text();
    email = $("#tblSearchPatient tbody").find(index).find("td:eq(6)").text();
    ph = $("#tblSearchPatient tbody").find(index).find("td:eq(5)").text();
    var phone = "(" + ph.substr(0, 3) + ")" + ph.substr(3, 6) + "-" + ph.substr(6, 10);
    surtitle = $("#txtGenSurveyTitle option:selected").text();
    deadline = $("#txtGenSurveyTitle option:selected").attr("DeadLine");
    var htmlData = "";
    htmlData += "<tr id='rows_"+patID+"' style='text-align:center; cursor:pointer' type='recent'>";
    htmlData += "<td style='display:none'>" + patID + "</td>";
    htmlData += "<td></td>";
    htmlData += "<td><span class='delete' title='Delete' onclick='DeleteThisPatient(" + patID + ")'></td>";
    htmlData += "<td>" + surtitle + "</td>";
    htmlData += "<td>" + Lname + "</td>";
    htmlData += "<td>" + Fname + "</td>";
    htmlData += "<td>" + email + "</td>";
    htmlData += "<td>" + phone + "</td>";
    htmlData += "<td>" + deadline + "</td>";
    htmlData += "</tr>";
    $("#txtPatientName").val(Lname + " " + Fname);
    $("#tblGeneratedSurvey tbody").append(htmlData);
    if ($("#tblGeneratedSurvey tbody tr:first").text() == "No Record Found") {
        $("#tblGeneratedSurvey tbody tr:first").remove();
    }
    $("#SeleclPatientModal").dialog("close");
    $("#chkAllPatients").prop("disabled", true);
    //$("#txtGenSurveyTitle").prop("disabled", true);
}

//------Patient Search End-------//


function DeleteThisPatient(index) {
    debugger;
    //$("#tblGeneratedSurvey tbody tr[type=recent]").filter(index).html("");
    var checktype=$("#rows_" + index).attr("type");
    if (checktype == "recent" || checktype == "Recent") {
        $('#txtPatientName').val('');
        $("#rows_" + index).remove();
    }

}