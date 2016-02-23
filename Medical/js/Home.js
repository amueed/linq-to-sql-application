var DashboardSettings = "";
var Settings = new Array();
function Widget() {
    this.Name = "";
    this.isShow = false;
}

$(document).ready(function () {
    GetDashboardSettings();
});

function GetDashboardSettings() {
    debugger;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "Home.aspx/GetDashboardSettings",
        success: DashboardLoad,
        error: function (ex) {
            alert("Load control error!");
        }
    });
}

function DashboardLoad(data) {
    debugger;
    DashboardSettings = data.d;
    for (var i = 0; i < DashboardSettings.length; i++) {
        var item = new Widget();
        item.Name = DashboardSettings[i].DASHBOARD_ITEM;
        item.isShow = DashboardSettings[i].SHOW_ITEM;
        Settings.push(item);
    }
    DrawWidgets();
}

function openWidgetMenu() {
    debugger;
    var htmlData = '';
    var load = DashboardSettings;
    if (load.length > 0) {
        htmlData += '<table id="tblDashboardSettings" width="330"><thead><tr><td>Widget Name</td></tr></thead><tbody id="tblBody">';
        for (i = 0; i < load.length; i++) {
            var checked = '';
            if (load[i].SHOW_ITEM == "1")
                checked = "checked='checked'";

            htmlData += '<tr id=' + load[i].DASHBOARD_SETTINGS_ID + '><td><input type="checkbox" type="checkbox" ' + checked + '" onclick="Check(this)">' + load[i].DASHBOARD_ITEM + '</input></td></tr>';
        }

        htmlData += '</tbody></table>';
        htmlData += '<input id="btnSaveWidget" type="button" value="Save" onclick="SaveChanges()"/>';
        
        $("#dialog").css({ 'font-size': '12px', 'font-weight': 'bold' });
        $("#dialog").html(htmlData).dialog({
            resizable: false,
            draggable: false,
            modal: true,
            width: '350',
            height: '200',
            show: 'fade',
            hide: 'fade',
            open: function () {
                $('.ui-widget-header').css({ 'font-size': '12px' });
            }
        });
    }
    else {
        alert("Error Loading Data");
    }
}

function Check(checkbox) {
    //if ($("#tblDashboardSettings input:checked").length > 2) {
    //    $(checkbox).removeAttr('checked');
    //    alert('Only 2 Items can be shown on Dash Board'); 
    //}
return true;
}

function SaveChanges() {
    debugger;

    DashboardSettings = "";
    Settings = new Array();

    var whereClause = "";
    $("#tblBody tr").each(function () {
        whereClause += $(this).children().eq(0).children().is(':checked') + "-" + $.trim($(this).attr("id")) + ";";
    });

    var param = "{'whereClause':'" + whereClause + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "Home.aspx/UpdateDashboardSettings",
        data: param,
        success: RefreshWidget,
        error: function (ex) {
            alert(ex.responseText);
        }
    });
}

function RefreshWidget(data) {
    debugger;
    GetDashboardSettings();
    //alert(data.d);
    $("#dialog").dialog('close');
    window.location.reload();
}

function DrawWidgets() {
    debugger;
    var name = "";
    var show = false;
    for (var i = 0; i < Settings.length; i++) {
        name = Settings[i].Name;
        show = Settings[i].isShow;
        var html;
        switch (name) {
            case "Patient Count":
                if (show == "1") {
                    html = "";
                    html += '<div id="WidgetData" class="dashboard-block">';
                    html += '<div id="WigdetHead" class="dashboard-head">'+Settings[i].Name+"</div>";
                    html += '<div id="WigdetBody" class="dashboard-contents">Body</div>';
                    html += "</div>";
                    $("#WidgetTable td:eq(0)").html(html);
                }
                break;
            case "Appointments Count":
                if (show == "1") {
                    html = "";
                    html += '<div id="WidgetData" class="dashboard-block">';
                    html += '<div id="WigdetHead" class="dashboard-head">' + Settings[i].Name + '</div>';
                    html += '<div id="WigdetBody" class="dashboard-contents">Body</div>';
                    html += "</div>";
                    $("#WidgetTable td:eq(1)").html(html);
                }
                break;
            case "Survey Count":
                if (show == "1") {
                    html = '';
                    html += '<div id="WidgetData" class="dashboard-block">';
                    html += '<div id="WigdetHead" class="dashboard-head">' + Settings[i].Name + '</div>';
                    html += '<div id="WigdetBody" class="dashboard-contents">Body</div>';
                    html += '</div>';
                    $('#WidgetTable td:eq(2)').html(html);
                }
                break;
        }
    }
}

