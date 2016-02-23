<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="css/Home.css" rel="stylesheet" />
    <script src="js/Home.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div style="color:red;font-weight:bold;text-align:center;cursor:pointer" onclick="openWidgetMenu()">Add/Remove Widget</div>
        
    <div id="dialog" title="Add/Remove Widget"></div>

    <div id="WidgetArea" style="">
        <table id="WidgetTable">
            <tr><td></td><td></td><td></td></tr>
        </table>
    </div>


    


</asp:Content>

