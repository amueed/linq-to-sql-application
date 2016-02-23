<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="AddPatient.aspx.cs" Inherits="AppPatient" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="js/AddPatient.js"></script>
    <link href="css/AddPatient.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <form id="frmPatient">
        <table  align="center" cellpadding="0" cellspacing="5" border="0" class="tbl">
            <tr>
                <td colspan="2" style="border-bottom: solid 1px #999999; color: Black; font-weight: bold; width: 35%; min-width: 314px;" valign="bottom">General Info</td>
                <td valign="middle" width="2%">&nbsp;</td>
                <td colspan="2" style="border-bottom: solid 1px #999999; color: Black; font-weight: bold; width: 35%; min-width: 314px;" valign="bottom">Address / Contact Details</td>

            </tr>

            <tr>
                <td valign="middle" align="right">Account No</td>
                <td valign="middle"><input id="txtAcc" maxlength="15" type="text" class="input-tran" style="margin-left: 12px; background-color: #EAEAEA; width: 160px" runat="server" disabled="disabled" /></td>
                <td>&nbsp;</td>
                <td valign="middle" align="right">Address*</td>
                <td valign="middle" rowspan="2"><textarea id="txtAddress" tabindex="14" style="width: 280px; height: 30px; resize: none;" rows="2" maxlength="35" onkeypress="return SetAddressLine2();"></textarea></td>
            </tr>

            <tr>
                <td valign="middle" align="right">Chart ID</td>
                <td valign="middle"><input id="txtChartID" type="text"  tabindex="1" maxlength="30" class="input-tran" style="margin-left: 10px; width: 160px" onkeypress="return isAlphaNumericKey(event);"/></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>

            <tr>
                <td valign="middle" align="right">Alternate Account</td>
                <td valign="middle"><input id="txtAA" type="text" tabindex="2" maxlength="18" class="input-tran" style="margin-left: 10px; width: 160px" onkeypress="return isNumberKey(event);"/></td>
                <td>&nbsp;</td>
                <td valign="middle" align="right">Address Line 2</td>
                <td valign="middle" rowspan="2"><textarea id="txtAddress2" tabindex="15" cols="20"  maxlength="30" style="width: 280px; height: 30px; resize: none;" rows="3"></textarea></td>
 
            </tr>

            <tr>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>

            </tr>

            <tr>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Address Type</td>
                <td valign="middle">
                    <select id="ddlAddressType" name="D1" tabindex="16" style="margin-left: 10px; margin-right: 10px; width: 144px;" class="input-tran">
                            <option></option>
                            <option value="RESIDENTIAL ADDRESS">Residential Address</option>
                            <option value="BUSINESS ADDRESS">Business Address</option>
                            <option value="MAILING ADDRESS">Mailing Address</option>
                    </select> 
                    Zip*<input id="txtZip" type="text" tabindex="17" maxlength="9" style="width: 76px; margin-right: 10px;" class="input-tran" onkeypress="return isNumberKey(event);" onblur="getCityAndState();"/>
                </td>

            </tr>

            <tr>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>

                <td valign="middle" align="right">Country/Parish Code</td>
                <td valign="middle"><input id="txtParishCode" type="text" maxlength="9" type="text" style="width: 50px; margin-left: 10px" class="input-tran" onkeypress="return isNumberKey(event);"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">Last Name*</td>
                <td valign="middle"><input id="txtLname" type="text" tabindex="3" class="input-tran" style="margin-left: 10px; width: 160px" onkeypress="return isAlphabetKey();"/></td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">City</td>
                <td valign="middle">
                    <select id="ddlCity" name="D2" tabindex="18" style="margin-left: 10px; margin-right: 10px; width: 144px;" class="input-tran">
                        <option></option>
                    </select> State<input id="txtState" type="text" tabindex="" type="text" style="width: 70px;" class="input-tran" disabled="disabled"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">First Name*</td>
                <td valign="middle"><input id="txtFname" type="text" tabindex="4" class="input-tran" style="margin-left: 10px; width: 160px" onkeypress="return isAlphabetKey();"/></td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Home Phone**</td>
                <td valign="middle"><input id="txtHomePhone" type="text" tabindex="19" maxlength="10" style="width: 144px; margin-left: 10px;" class="input-tran" onkeypress="return isNumberKey(event);" onblur="return IsPhone1();"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">MI</td>
                <td valign="middle"><input id="txtMI" type="text" tabindex="5" maxlength="1" class="input-tran" style="margin-left: 10px; width: 40px" onkeypress="return isCharKey(event)"/></td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Cell Phone**</td>
                <td valign="middle"><input id="txtCellPhone" type="text" tabindex="20" maxlength="10" style="width: 144px; margin-left: 10px;" class="input-tran" onkeypress="return isNumberKey(event);" onblur="return IsPhone2();"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">DOB*</td>
                <td valign="middle"><input id="txtDate" type="text" tabindex="6" class="input-tran" maxlength="10" style="margin-left: 10px;width: 68px"/></td><td>&nbsp;</td>
                <td valign="middle" align="right">Work Phone**</td>
                <td valign="middle"><input id="txtWorkPhone" type="text" tabindex="21" maxlength="10" style="width: 144px; margin-left: 10px;" class="input-tran" onkeypress="return isNumberKey(event);"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">SSN</td>
                <td valign="middle"><input id="txtSSN" type="text" tabindex="7" class="input-tran" style="margin-left: 10px; width: 160px"/></td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Email</td>
                <td valign="middle"><input id="txtEmail" type="text" class="input-tran" maxlength="50" tabindex="22" style="margin-left: 10px; padding-right: 10px; width: 235px;" onblur="return isEmail();" /></td>

            </tr>

            <tr>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;<input id="chkEmail" type="checkbox" tabindex=""/> Don't have email</td>

            </tr>

            <tr>
                <td align="right">Gender*</td>
                <td valign="middle">
                    <select id="ddlGender" tabindex="8" style="margin-left: 10px; width: 160px;" class="input-tran"">
                        <option></option>
                        <option id="male">Male</option>
                        <option id="female">Female</option>
                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">CCP</td><td>
                    <select id="ddlCCP" name="D3" tabindex="23"style="margin-left: 10px; margin-right: 10px; width: 144px;" class="input-tran">
                        <option></option>
                    </select>&nbsp;
                <input id="Checkbox2" type="checkbox" tabindex="24"/> Hospice</td>

            </tr>

            <tr>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Recalls</td>
                <td valign="middle"><input id="txtRecall" type="text" style="width: 144px; margin-left: 10px; background-color: #EAEAEA;" class="input-tran" readonly="readonly"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">Marital Status</td>
                <td valign="middle">
                    <select id="ddlMarital" tabindex="9" style="margin-left: 10px; width: 160px;" class="input-tran"">
                            <option></option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Widower">Widower</option>
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Partner">Partner</option>
                            <option value="Other">Unknown</option>
                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" colspan="2"><b>Emergency Contact</b></td></tr>

            <tr>
                <td valign="middle" align="right">Race**</td>
                <td valign="middle">
                    <select id="ddlRace" tabindex="10" style="margin-left: 10px; width: 160px;" class="input-tran">
                            <option></option>
                            <option title="White" value="white">White</option>
                            <option title="American Indian Or Alaska Native" value="american indian or alaska native">
                                American Indian or Alaska Native</option>
                            <option title="Asian" value="asian">Asian</option>
                            <option title="Black or African American" value="black or african american">Black or
                                African American</option>
                            <option title="Decline to Specify" value="decline to specify">Decline to Specify</option>
                            <option title="Native Hawaiian Or Other Pacific Islander" value="native hawaiian or other pacific islander">
                                Native Hawaiian or Other Pacific Islander</option>
                            <option title="Undetermined" value="undetermined">Undetermined</option>
                            <option title="Other Race" value="other race">Other Race</option>
                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Name</td>
                <td valign="middle"><input id="txtEmergencyName" type="text" class="input-tran" tabindex="25" style="margin-left: 10px; width: 144px" maxlength="40" onkeypress="return isAlphabetKey(event);"/></td></tr>

            <tr>
                <td valign="middle" align="right">Race 2**</td>
                <td valign="middle">
                    <select id="ddlRace2"  tabindex="11"style="margin-left: 10px; width: 160px;" class="input-tran">
                            <option></option>
                            <option title="White" value="white">White</option>
                            <option title="American Indian Or Alaska Native" value="american indian or alaska native">
                                American Indian or Alaska Native</option>
                            <option title="Asian" value="asian">Asian</option>
                            <option title="Black or African American" value="black or african american">Black or
                                African American</option>
                            <option title="Decline to Specify" value="decline to specify">Declined to Specify</option>
                            <option title="Native Hawaiian Or Other Pacific Islander" value="native hawaiian or other pacific islander">
                                Native Hawaiian or Other Pacific Islander</option>
                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Relationship</td>
                <td valign="middle">
                    <select id="ddlEmergenceRelationship" name="D4" tabindex="26" style="margin-left: 10px; margin-right: 10px; width: 144px;" class="input-tran">
                            <option></option>
                            <option value="B">Brother</option>
                            <option value="C">Child</option>
                            <option value="F">Father</option>
                            <option value="GF">Grandfather</option>
                            <option value="GM">Grandmother</option>
                            <option value="I">Sister</option>
                            <option value="M">Mother</option>
                            <option value="P">Spouse</option>
                            <option value="S">Self</option>
                            <option value="O">Other</option>
                    </select>

                </td>

            </tr>

            <tr>
                <td valign="middle" align="right">Ethnicity*</td>
                <td valign="middle">
                    <select id="ddlEthnicity" tabindex="12" style="margin-left: 10px; width: 160px;" class="input-tran">                            
                            <option></option>
                            <option value="caucasian">Caucasian</option>
                            <option value="decline to specify">Decline to Specify</option>
                            <option value="hispanic or latino">Hispanic or Latino</option>
                            <option value="not hispanic or latino">Not Hispanic or Latino</option>
                            <option value="undetermined">Undetermined</option>
                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Phone</td>
                <td valign="middle"><input id="txtEmergencyPhone" type="text" tabindex="27" maxlength="10" class="input-tran" style="margin-left: 10px; width: 144px" onkeypress="return isNumberKey(event);"/></td>

            </tr>

            <tr>
                <td valign="middle" align="right">Preferred Language*</td>
                <td valign="middle">
                    <select id="ddlLanguage" tabindex="13" style="margin-left: 10px; width: 160px;" class="input-tran">                            
                            <option></option>
                            <option value="arabic">Arabic</option>
                            <option value="armenian">Armenian</option>
                            <option value="bengali">Bengali</option>
                            <option value="chinese-cantonese">Chinese-Cantonese</option>
                            <option value="chinese-mandarin">Chinese-Mandarin</option>
                            <option value="decline to specify">Decline to Specify</option>
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="french creole">French Creole</option>
                            <option value="german">German</option>
                            <option value="greek">Greek</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="hindi">Hindi</option>
                            <option value="italian">Italian</option>
                            <option value="japanese">Japanese</option>
                            <option value="korean">Korean</option>
                            <option value="persian">Persian</option>
                            <option value="polish">Polish</option>
                            <option value="portuguese">Portuguese</option>
                            <option value="russian">Russian</option>
                            <option value="spanish">Spanish</option>
                            <option value="tagalog">Tagalog</option>
                            <option value="urdu">Urdu</option>
                            <option value="vietnamese">Vietnamese</option>
                            <option value="undetermined">Undetermined</option>
                            <option value="more...">more...</option>

                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle">&nbsp;</td>

            </tr>

            <tr>
                <td colspan="2" style="border-bottom: solid 1px #999999; color: Black; font-weight: bold; width: 35%; min-width: 314px;" valign="bottom">Financial Guarantor</td>
                <td valign="middle">&nbsp;</td>
                <td colspan="2" style="border-bottom: solid 1px #999999; color: Black; font-weight: bold; width: 35%; min-width: 314px;" valign="bottom"><b>Death</b></td>

            </tr>

            <tr>
                <td valign="middle" align="right">Name</td>
                <td valign="middle"><input id="txtFGName" type="text" class="input-tran" tabindex="28" style="margin-left: 10px; width: 160px" onkeypress="return isAlphabetKey(event);"/></td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Death Date</td>
                <td valign="middle"><input id="txtDOD" type="text" tabindex="30" class="input-tran" style="width: 68px; margin-left: 10px;"/></td></tr>

            <tr>
                <td valign="middle" align="right">Relationship</td>
                <td valign="middle">
                    <select id="ddlRelationship" tabindex="29" style="margin-left: 10px; width: 160px;" class="input-tran"">
                            <option></option>
                            <option value="B">Brother</option>
                            <option value="C">Child</option>
                            <option value="F">Father</option>
                            <option value="GF">Grandfather</option>
                            <option value="GM">Grandmother</option>
                            <option value="I">Sister</option>
                            <option value="M">Mother</option>
                            <option value="P">Spouse</option>
                            <option value="S">Self</option>
                            <option value="O">Other</option>
                    </select>

                </td>
                <td valign="middle">&nbsp;</td>
                <td valign="middle" align="right">Cause of Death</td>
                <td valign="middle"><input id="txtCOD" type="text" class="input-tran" tabindex="31" style="width: 260px; margin-left: 10px;" onkeypress="return isAlphaNumericKey(event);"/></td>

            </tr>
            

            
            <tr>
                <td>
                    <input type="button" id="btnSave" value="Save" class="button" onclick="return isEmpty();"/>
                    &nbsp;
                    <input type="reset" id="btnClear" value="Clear" class="button"/>
                </td>
                <td></td>
            </tr>

        </table>
    </form>
    <table width="80%" align="center" border="0" class="tbl">
            <thead id="tblHead" class="tblHead">
                <tr>
                    <td>Patient Account</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Gender</td>
                    <td>Martital Status</td>
                    <td>Address</td>
                    <td>Email</td>
                    <td>Cell Phone</td>
                </tr>
            </thead>
            <tbody id="tblBody" class="tblBody">

            </tbody>
        </table>
</asp:Content>

