<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="TableFilter.aspx.cs" Inherits="TableFilter" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="js/TableFilter.js"></script>
    <link href="css/FilterTable.css" rel="stylesheet" />

    <style type="text/css">
        .button-1
        {
            width: auto;
            height: auto;
            color: #fff;
            text-align: center;
            font-size: 16px;
            background-color: #00419C;
            padding: 1px 5px 3px 8px;
            border-radius: 5px;
            cursor: pointer;
            display: inline-block;
            position: relative;
        }

        .count
        {
            color: #fff;
            text-align: center;
            background-color: red;
            font-size: 13px;
            font-weight: bold;
            padding: 2px;
            border-radius: 10px;
            display: none;
            position: absolute;
            top: -12px;
            right: 5px;
        }

        .highlight
        {
            background-color:yellow;
        }
    </style>
    <script type="text/javascript">
        var msg = 0;
        $(document).ready(function () {
            $("#tab-1").click(function () {
                debugger;
                msg = 0;
                //$("#tab-alert-1").css("display", "none").fadeOut(2000);
                $("#tab-alert-1").fadeOut(1500);
            });
        });

        function SendMsg() {
            debugger;
            msg++;
            (msg.length > 0) ? msg = msg : msg = '0' + msg;
            (msg.length > 2) ? msg = msg.substring(1, msg.length) : msg = msg;
            $("#tab-alert-1").text("");
            $("#tab-alert-1").text(msg).effect("shake", { times: 1, distance: 2, direction: "down" }, 500);
            $("#tab-alert-1").css("display", "inline");
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="tabs">
        <ul>
            <li><a href="#tabs-1">Nunc tincidunt</a></li>
            <li><a href="#tabs-2">Proin dolor</a></li>
            <li><a href="#tabs-3">Aenean lacinia</a></li>
        </ul>
        <div id="tabs-1">
            <table id="tblBooks">
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Price</td>
                    </tr>
                    <tr style="display: none">
                        <td>
                            <input id="FilterByTitle" type="text" class="filter" placeholder="Filter By Title" onkeyup="ByTitle();" /></td>
                        <td>
                            <input id="FilterByAuthor" type="text" class="filter" placeholder="Filter By Author" onkeyup="ByAuthor();"/></td>
                        <td>
                            <input id="FilterByPrice" type="text" class="filter" placeholder="Filter By Price" onkeyup="ByPrice();"/></td>
                    </tr>
                </thead>
                <tbody id="tblBooksBody">
                </tbody>
            </table>
        </div>
        <div id="tabs-2">
        </div>
        <div id="tabs-3">
        </div>
    </div>
    <div>
        <div id="tab-1" class="button-1">
            <lable>Messages</label>
                <span id="tab-alert-1" class="count">01</span>
        </div>

        <div id="tab-2" class="button-1">
            <lable>Appointments</label>
                <span id="tab-alert-2" class="count">01</span>
        </div>

        <div id="tab-3" class="button-1">
            <lable>Tasks</label>
                <span id="tab-alert-3" class="count">01</span>
        </div>
        <br />
        <input type="button" value="Send" onclick="SendMsg();" />
    </div>

</asp:Content>

