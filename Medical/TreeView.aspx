<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="TreeView.aspx.cs" Inherits="Practice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
        .emp{
            display:none;
        }
        .changeStyle {
            color:red;
            font-weight:bold;
        }

        .tree-show
        {
            width:18px;
            height:18px;
            background: url('images/arrows_sprite.png') no-repeat -24px -444px;
            display:inline-block;
            cursor:pointer;
        }
       .tree-hide
        {
            width:18px;
            height:18px;
            background: url('images/arrows_sprite.png') no-repeat 1px -120px;
            display:inline-block;
            cursor:pointer;
        }
        .tree-item
        {
            display:none;
        }
        li
        {
            list-style:none;
        }

    </style>
    <script type="text/javascript">
        function ShowHide(c) {
            debugger;
            $('.' + c).toggle();
        }
        function ChangeColor() {
            debugger;
            $('#span1').toggleClass("changeStyle");
        }

        function ToggleTree(id) {
            debugger;
            var item = $("#" + id);
            if (item.find("span:eq(0)").hasClass("tree-hide")) {
                item.find("span:eq(0)").removeClass("tree-hide").addClass("tree-show");
                item.find("ul li").removeClass("tree-item");
                
            }
            else {
                item.find("span:eq(0)").removeClass("tree-show").addClass("tree-hide");
                item.find("ul li").addClass("tree-item");
            }
            //$(item).toggleClass("tree-hide").toggleClass("tree-show");
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <table id="tblUsers" align="center" width="300 border="1">
        <thead>
            <tr><td colspan="4"><span id="span1" style="cursor:pointer;" onclick="ShowHide('data');ChangeColor();">Show/Hide</span></td></tr>
            <tr><td>Edit</td><td>Emp ID</td><td>Emp Name</td><td>Dept</td></tr>
        </thead>
        <tbody class="data" style="display:none">
            <tr><td class="edit"></td><td>EMP001</td><td>ALI</td><td>HR</td></tr>
            <tr><td class="edit"></td><td>EMP002</td><td>ALI</td><td>MK</td></tr>
            <tr><td class="edit"></td><td>EMP003</td><td>ALI</td><td>IT</td></tr>
            <tr><td class="edit"></td><td>EMP004</td><td>ALI</td><td>IT</td></tr>
            <tr><td class="edit"></td><td>EMP005</td><td>ALI</td><td>MK</td></tr>
        </tbody>

    </table>

    <div id="tree" style="border:1px solid black; width:300px; height:200px; padding:5px">
        <ul>
            <li id="tree_1"><span class="tree-hide" onclick="ToggleTree('tree_1')"></span><span>Tree 1</span>
                <ul>
                    <li class="tree-item">Item 1</li>
                    <li class="tree-item">Item 2</li>
                    <li class="tree-item">Item 3</li>
                </ul>
            </li>
            <li id="tree_2"><span class="tree-hide" onclick="ToggleTree('tree_2')"></span><span>Tree 2</span>
                <ul>
                    <li class="tree-item">Item 1</li>
                    <li class="tree-item">Item 2</li>
                    <ul>
                        <li class="tree-item">1</li>
                        <li class="tree-item">2</li>
                    </ul>
                    <li class="tree-item">Item 3</li>
                </ul>
            </li>
        </ul>
    </div>
</asp:Content>
