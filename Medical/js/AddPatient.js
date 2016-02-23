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


$(document).ready(function () {
    fetchData();
    
    $("#chkEmail").click(function () {
        if ($("#chkEmail").is(":checked")) {
            $("#txtEmail").attr("disabled", "disabled");
        }
        else {
            $("#txtEmail").removeAttr("disabled");
        }
    });

    $("#btnClear").click(function () {
        $('#btnSave').prop('disabled', false);
    });
});

/*-----jQuery Date Picker Start-----*/

$(function () {
    $("#txtDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",
    });
});

$(function () {
    $("#txtDOD").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",
    });
});

/*-----jQuery Date Picker End-----*/


/*-----Numbers Only Check-----*/

function isNumberKey(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode < 48 || charCode > 57) {
        alert("This field accept digits only.");
        return false;
    }

    return true;
}

/*-----Character Only Check-----*/

function isCharKey(evt) {
    var regex = new RegExp("^[A-Za-z]$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        alert("This field accept one character only.");
        return false;
    }
    return true;
}

/*-----Alphabets Only Check-----*/

function isAlphabetKey(evt) {
    var regex = new RegExp("^[A-Za-z]*$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        alert("This field accept alphabets only.");
        return false;
    }
    return true;
}

/*-----AlphaNumeric Only Check-----*/

function isAlphaNumericKey(evt) {
    var regex = new RegExp("^[0-9A-Za-z\._-]*$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        alert("No Special Character is Allowed.");
        return false;
    }
    return true;
}


/*-----Email Check-----*/

function isEmail() {
    var email = $("#txtEmail").val();
    var regex = new RegExp("^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$");
    if (email.length > 0 && !regex.test(email)) {
        alert("Invalid Format of Email. Example: user@company.com");
        $("#txtEmail").focus();
        return false;
    }
    return true;
}


function IsPhone1() {
    var phone = $("#txtHomePhone").val();
    if (phone.length > 0 && phone.length < 10) {
        alert("Enter correct Format of Phone Number.");
        $("#txtHomePhone").focus();
        return false;
    }
    return true;
}

function IsPhone2() {
    var phone = $("#txtCellPhone").val();
    if (phone.length > 0 && phone.length < 10) {
        alert("Enter correct Format of Phone Number.");
        $("#txtCellPhone").focus();
        return false;
    }
    return true;
}

function IsPhone3() {
    var phone = $("#txtWorkPhone").val();
    if (phone.length > 0 && phone.length < 10) {
        alert("Enter correct Format of Phone Number.");
        $("#txtWorkPhone").focus();
        return false;
    }
    return true;
}


function SetAddressLine2() {
    var add = $("#txtAddress").val();
    if (add.length >= 35) {
        alert("Please use Address Line2.");
        $("#txtAddress2").focus();
        return false;
    }
    return true;
}

//function NumberKey() {

//    var numRegex = /^[0123456789]*$/;
//    var key = $("#txtChartID").val();
//    if (!(key.match(numRegex))) {
//        //$("#txtChartID").val("");
//        return false;
//    }

//    return true;
//}

function isEmpty() {

    var lname = $("#txtLname").val();
    var fname = $("#txtFname").val();
    var date = $("#txtDate").val();
    var gender = $("#ddlGender").val();
    var race = $("#ddlRace").val();
    var race2 = $("#ddlRace2").val();
    var ethnicity = $("#ddlEthnicity").val();
    var lang = $("#ddlLanguage").val();
    var address = $("#txtAddress").val();
    var zip = $("#txtZip").val();
    var cell = $("#txtCellPhone").val();
    var work = $("#txtWorkPhone").val();
    var email = $("#txtEmail").val();

    if (lname.length == 0) {
        alert("Enter Last Name");
        $("#txtLname").focus();
        return false;
    }
    if (fname.length == 0) {
        alert("Input First Name");
        $("#txtFname").focus();
        return false;
    }
    if (date.length == 0) {
        alert("Enter D.O.B");
        $("#txtDate").focus();
        return false;
    }
    if (gender.length == 0) {
        alert("Enter Gender");
        $("#ddlGender").focus();
        return false;
    }
    if (race.length == 0) {
        alert("Enter Race");
        $("#ddlRace").focus();
        return false;
    }
    if (ethnicity.length == 0) {
        alert("Enter Ethnicity");
        $("#ddlEthnicity").focus();
        return false;
    }
    if (lang.length == 0) {
        alert("Enter Language");
        $("#ddlLanguage").focus();
        return false;
    }
    if (address.length == 0) {
        alert("Enter Address");
        $("#txtAddress").focus();
        return false;
    }
    if (zip.length == 0) {
        alert("Enter Zip Code");
        $("#txtZip").focus();
        return false;
    }
    if (cell.length == 0) {
        alert("Enter Cell Phone");
        $("#txtCellPhone").focus();
        return false;
    }
    //if($("#chkEmail").is(":unchecked")){
    //    if (email.length == 0) {
    //        alert("Enter Email");
    //        $("#txtEmail").focus();
    //        return false;
    //    }
    //}
    InsertIntoDB();
    //alert("Success!");
    return true;
}

/*-----Insertion of Data-----*/

function InsertIntoDB() {
    debugger;
    var chartID = null;
    var alternateAcc = null;
    var lname = null;
    var fname = null;
    var mi = '';
    var dob = null;
    var ssn = null;
    var gender = null;
    var marital = null;
    var race = null;
    var race2 = null;
    var ethnicity = null;
    var lang = null;
    var address = null;
    var address2 = null;
    var addressType = null;
    var zip = null;
    var parishcode = null;
    var city = null;
    var state = null;
    var home = null;
    var cell = null;
    var work = null;
    var email = null;
    var ccp = null;
    var recall = null;
    var eName = null;
    var eRelation = null;
    var ePhone = null;
    var lab = null;
    var phar1 = null;
    var phar2 = null;
    var dod = "";
    var cod = null;
    var provider = null;
    var ploc = null;

    var chartID = $("#txtChartID").val();
    var alternateAcc = $("#txtAA").val();
    var lname = $("#txtLname").val();
    var fname = $("#txtFname").val();
    var mi = $("#txtMI").val();
    var dob = $("#txtDate").val();
    var ssn = $("#txtSSN").val();
    var gender = $("#ddlGender").val();
    var marital = $("#ddlMarital").val();
    var race = $("#ddlRace").val();
    var race2 = $("#ddlRace2").val();
    var ethnicity = $("#ddlEthnicity").val();
    var lang = $("#ddlLanguage").val();
    var address = $("#txtAddress").val();
    var address2 = $("#txtAddress2").val();
    var addressType = $("#ddlAddressType").val();
    var zip = $("#txtZip").val();
    var parishcode = $("#txtParishCode").val();
    var city = $("#ddlCity").val();
    var state = $("#txtState").val();
    var home = $("#txtHomePhone").val();
    var cell = $("#txtCellPhone").val();
    var work = $("#txtWorkPhone").val();
    var email = $("#txtEmail").val();
    //var ccp = $("#ddlCCP").val();
    //var recall = $("#txtRecall").val();
    var eName = $("#txtEmergencyName").val();
    var eRelation = $("#ddlEmergenceRelationship").val();
    var ePhone = $("#txtEmergencyPhone").val();
    //var lab = $("#ddlLab").val();
    //var phar1 = $("#txtPharmacy1").val();
    //var phar2 = $("#txtPharmacy2").val();
    var dod = $("#txtDOD").val();
    var cod = $("#txtCOD").val();
    var fgName = $("#txtFGName").val();
    var fgRel = $("#ddlRelationship").val();
    //var provider = $("#ddlProvider").val();
    //var ploc = $("#ddlLocation").val();

    //alert(address);
    BlockUI();
    $.ajax({
        type: "POST",
        url: "AddPatient.aspx/InsertPatient",
        data: '{ChartID:"' + chartID + '", AlternateAcc:"' + alternateAcc + '", Lname:"' + lname + '", Fname:"' + fname + '", MI:"' + mi + '", DOB:"' + dob + '", SSN:"' + ssn + '", Gender:"' + gender + '", Marital:"' + marital + '", Race:"' + race + '", Race2:"' + race2 + '", Ethnicity:"' + ethnicity + '", Lang:"' + lang + '", Address:"' + address + '", Address2:"' + address2 + '", AddressType:"' + addressType + '", Zip:"' + zip + '", ParishCode:"' + parishcode + '", City:"' + city + '", State:"' + state + '", Home:"' + home + '", Cell:"' + cell + '", Work:"' + work + '", Email:"' + email + '", CCP:"' + ccp + '", Recall:"' + recall + '", EmeName:"' + eName + '", EmeRelation:"' + eRelation + '", EmePhone:"' + ePhone + '", Lab:"' + lab + '", Pharmacy1:"' + phar1 + '", Pharmacy2:"' + phar2 + '", DOD:"' + dod + '", COD:"' + cod + '", Provider:"' + provider + '", ProLocation:"' + ploc + '",  FGName:"' + fgName + '",  FGRel:"' + fgRel + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            var acc = data.d;
            clearFields();
            UnBlockUI();
            alert("Your Patient # "+ acc);
        },

        failure: function () {

            alert("Fail");
        }
    });
}


/*-----Retrieving Data-----*/


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

function fetchData() {
    BlockUI();
    $.ajax({
        type: "POST",
        url: "AddPatient.aspx/SelectData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            var result = data.d;
            //alert(result);
            var tableData = "";
            var add="";
            for (var i=0; i < result.length; i++){
          
                tableData += "<tr id='row" + i + "' style='cursor:pointer;' onclick='SelectedRow(" + i + ")' onmouseover='ChangeColor(" + i + ")' onmouseout='RemoveColor(" + i + ")'>";
                tableData += "<td id='patAcc"+ i +"'>" + result[i].Patient_Account + "</td>";
                tableData += "<td id='fname" + i + "'>" + result[i].First_Name + "</td>";
                tableData += "<td id='lname" + i + "'>" + result[i].Last_Name + "</td>";
                tableData += "<td id='gender" + i + "'>" + result[i].Gender + "</td>";
                tableData += "<td id='m_status" + i + "'>" + result[i].Marital_Status + "</td>";
                tableData += "<td id='address" + i + "'>" + result[i].Address + "</td>";
                tableData += "<td id='email" + i + "'>" + result[i].Email_Address + "</td>";
                tableData += "<td id='c_phone" + i + "'>" + result[i].cell_phone + "</td>";
                tableData += "<td id='mi" + i + "' style='display:none'>" + result[i].MI + "</td>";
                tableData += "<td id='ssn" + i + "' style='display:none'>" + result[i].SSN + "</td>";
                tableData += "<td id='dob" + i + "' style='display:none'>" + convertDatetoString(result[i].Date_Of_Birth, 2) + "</td>";
                tableData += "<td id='race" + i + "' style='display:none'>" + result[i].race + "</td>";
                tableData += "<td id='race2_" + i + "' style='display:none'>" + result[i].RACE2 + "</td>";
                tableData += "<td id='city" + i + "' style='display:none'>" + result[i].City + "</td>";
                tableData += "<td id='state" + i + "' style='display:none'>" + result[i].State + "</td>";
                tableData += "<td id='zip" + i + "' style='display:none'>" + result[i].ZIP + "</td>";
                tableData += "<td id='h_phone" + i + "' style='display:none'>" + result[i].Home_Phone + "</td>";
                tableData += "<td id='b_phone" + i + "' style='display:none'>" + result[i].Business_Phone + "</td>";
                tableData += "<td id='fgname" + i + "' style='display:none'>" + result[i].Financial_Guarantor + "</td>";
                tableData += "<td id='fgrel" + i + "' style='display:none'>" + result[i].guar_rel + "</td>";
                tableData += "<td id='chartid" + i + "' style='display:none'>" + result[i].Chart_Id + "</td>";
                tableData += "<td id='emer_name" + i + "' style='display:none'>" + result[i].emer_contact_name + "</td>";
                tableData += "<td id='emer_rel" + i + "' style='display:none'>" + result[i].emer_contact_rel + "</td>";
                tableData += "<td id='emer_contact" + i + "' style='display:none'>" + result[i].emer_contact_ph + "</td>";
                tableData += "<td id='dc" + i + "' style='display:none'>" + result[i].DeathCause + "</td>";
                tableData += "<td id='lang" + i + "' style='display:none'>" + result[i].languages + "</td>";
                tableData += "<td id='addr_type" + i + "' style='display:none'>" + result[i].Address_Type + "</td>";
                tableData += "<td id='c_parish" + i + "' style='display:none'>" + result[i].CountyParish_code + "</td>";
                tableData += "<td id='addr_line2_" + i + "' style='display:none'>" + result[i].Address_Line2 + "</td>";
                tableData += "<td id='ethni" + i + "' style='display:none'>" + result[i].ETHNICITIES + "</td>";
                tableData += "</tr>";
            } 

            $("#tblBody").append(tableData);
            UnBlockUI();

        },
        error: function () {
            alert("Fail");
        }
    });
}

function SelectedRow(row) {
    $("#txtAcc").val($("#patAcc" + row).text());
    $("#txtChartID").val($("#chartid" + row).text());
    $("#txtLname").val($("#lname" + row).text());
    $("#txtFname").val($("#fname" + row).text());
    $("#txtMI").val($("#mi" + row).text());
    $("#txtDate").val($("#dob" + row).text());
    $("#txtSSN").val($("#ssn" + row).text());
    $("#ddlGender").val($("#gender" + row).text());
    $("#ddlMarital").val($("#m_status" + row).text());
    $("#ddlRace").val($("#race" + row).text());
    $("#ddlRace2").val($("#race2_" + row).text());
    $("#ddlEthnicity").val($("#ethni" + row).text());
    $("#ddlLanguage").val($("#lang" + row).text());
    $("#txtAddress").val($("#address" + row).text());
    $("#txtAddress2").val($("#addr_line2_" + row).text());
    $("#ddlAddressType").val($("#addr_type" + row).text());
    $("#txtZip").val($("#zip" + row).text());
    $("#txtParishCode").val($("#c_parish" + row).text());
    $("#ddlCity").val($("#city" + row).text());
    $("#txtState").val($("#state" + row).text());
    $("#txtHomePhone").val($("#h_phone" + row).text());
    $("#txtCellPhone").val($("#c_phone" + row).text());
    $("#txtWorkPhone").val($("#b_phone" + row).text());
    $("#txtEmail").val($("#email" + row).text());
    $("#txtEmergencyName").val($("#emer_name" + row).text());
    $("#ddlEmergenceRelationship").val($("#emer_rel" + row).text());
    $("#txtEmergencyPhone").val($("#emer_contact" + row).text());
    $("#txtFGName").val($("#fgname" + row).text());
    $("#ddlRelationship").val($("#fgrel" + row).text());
    //$("#txtDOD").val($("#patAcc" + row).text());
    $("#txtCOD").val($("#dc" + row).text());
    debugger; 
    $("#tblBody tr").removeClass("selectedRow");
    $("#tblBody tr").removeClass("hoverRow");
    $("#row" + row).addClass("selectedRow");
    $('#btnSave').prop('disabled', true);
}

function ChangeColor(row) {
    $("#row" + row).addClass("hoverRow");
}

function RemoveColor(row) {
    $("#row" + row).removeClass("hoverRow");
}


function clearFields() {
    $("#txtChartID").val('');
    $("#txtAA").val('');
    $("#txtLname").val('');
    $("#txtFname").val('');
    $("#txtMI").val('');
    $("#txtDate").val('');
    $("#txtSSN").val('');
    $("#ddlGender").val('');
    $("#ddlMarital").val('');
    $("#ddlRace").val('');
    $("#ddlRace2").val('');
    $("#ddlEthnicity").val('');
    $("#ddlLanguage").val('');
    $("#txtAddress").val('');
    $("#txtAddress2").val('');
    $("#ddlAddressType").val('');
    $("#txtZip").val('');
    $("#txtParishCode").val('');
    $("#ddlCity").val('');
    $("#txtState").val('');
    $("#txtHomePhone").val('');
    $("#txtCellPhone").val('');
    $("#txtWorkPhone").val('');
    $("#txtEmail").val('');
    $("#ddlCCP").val('');
    $("#txtRecall").val('');
    $("#txtEmergencyName").val('');
    $("#ddlEmergenceRelationship").val('');
    $("#txtEmergencyPhone").val('');
    $("#ddlLab").val('');
    $("#txtPharmacy1").val('');
    $("#txtPharmacy2").val('');
    $("#txtDOD").val('');
    $("#txtCOD").val('');
    $("#ddlProvider").val('');
    $("#ddlLocation").val('');
    $("#txtFGName").val('');
    $("#ddlRelationship").val('');
}

function getCityAndState() {
    var zip = $("#txtZip").val();
    if (zip != "") {
        $.ajax({
            type: "POST",
            url: "AddPatient.aspx/getCity",
            data: '{ZIP:"' + zip + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fetchCityState,
            error: function () {
                alert("Fail");
            }
        });
    }
}

function fetchCityState(data) {
    var data = data.d;
    var CityName = "";
    var State = "";
    var htmlCityName = "";
    if (data.length != 0) {
        $("#ddlCity").html("");
        var options = "";
        for (var i = 0; i < data.length; i++) {
            CityName = data[i].City_Name;
            State = data[i].State_Code;
            //alert(CityName + State);
            options += "<option>" + CityName + "</option>";
        }
        $("#ddlCity").html(options);
        $("#txtState").val(State);
    }
    else {
        alert("Invalid ZIP");
        $("#txtZip").focus();
        $("#ddlCity']").val('');
        $("#txtState").val('');
        return false;
    }
}