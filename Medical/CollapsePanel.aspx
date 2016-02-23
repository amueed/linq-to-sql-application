<%@ Page Title="" Language="C#" MasterPageFile="~/Main.master" AutoEventWireup="true" CodeFile="CollapsePanel.aspx.cs" Inherits="CollapsePanel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style>
        /*----------Collapse Panel Start-----------*/
        .col
        {
            width:90%;
            margin-left:auto;
            margin-right:auto;
            margin-bottom:5px;
        }
        .col-head
        {
            width:100%;
            height:25px;
            background-color:#8467a5;
            //background: url('images/bg_top-nav.jpg') repeat-x;
            border-radius:5px 5px 0px 0px;
            text-indent: 10px;
            line-height:25px;
            color:#fff;
            font-size:16px;
            font-weight:bold;
            cursor:pointer;
        }
        .col-head:hover
        {
            opacity:0.8;
        }
        .col-body
        {
            width:100%;
            height:800px;
            background-color:#d9d9d9;
        }
        .arrow-down 
        {
	        width: 0; 
	        height: 0; 
	        border-left: 5px solid transparent;
	        border-right: 5px solid transparent;
	        border-top: 5px solid #fff;
            float:right;
            margin-right:10px;
            margin-top:13px;
        }
        .open
        {
            display:block;
        }
        .close
        {
            display:none;
        }
        /*-----------Side Menu For Collapsing-------------*/
        #col-menu
        {
            width:60px;
            position:fixed;
            margin-left:95.2%;
            margin-top:10%;
        }
        .btnCol
        {
            width:35px;
            border:1px solid #8467a5;
            border-radius:5px;
            margin-bottom:3px;
            text-align:center;
            font-size:14px;
            font-weight:bold;
            cursor:pointer;
        }
       .btnCol:hover
        {
            margin-left:-3px;
            border-bottom-left-radius:0px;
            border-top-left-radius:0px;
            background-color:#8467a5;
            color:#fff;
        }
        .active-btn
        {
            margin-left:-3px;
            border-bottom-left-radius:0px;
            border-top-left-radius:0px;
            background-color:#8467a5;
            color:#fff;
        }
        .open-btn
        {
            margin-left:-3px;
            border-bottom-left-radius:0px;
            border-top-left-radius:0px;
            border-left: 0px;
        }

        input 
        { 
            font-size: 14px; 
            font-weight: bold;  

        }
 
        input[type=range]:before 
        { 
            content: attr(min); 
            padding-right: 5px; 

        }
        input[type=range]:after 
        { 
            content: attr(max); 
            padding-left: 5px;}
 
        output 
        { 
            display: block;
            font-size: 5.5em;
            font-weight: bold;
        }

    </style>
    <script>
        $(document).ready(function () {
            //if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
            //window.onmousewheel = document.onmousewheel = wheel;

            //function wheel(event) {
            //    var delta = 0;
            //    if (event.wheelDelta) delta = event.wheelDelta / 120;
            //    else if (event.detail) delta = -event.detail / 3;

            //    handle(delta);
            //    if (event.preventDefault) event.preventDefault();
            //    event.returnValue = false;
            //}

            //function handle(delta) {
            //    var time = 400;
            //    var distance = 400;

            //    $('html, body').stop().animate({
            //        scrollTop: $(window).scrollTop() - (distance * delta)
            //    }, time);
            //}
        });

        function CollapseAll() {
            debugger;
            $(".col-body").each(function () {
                if ($(this).hasClass("open")) {
                    $(this).addClass("close").slideUp(1000).removeClass("open");
                    $(".btnCol").removeClass("active-btn open-btn");
                }
            });
        }

        function ShowHide(Index, Col) {
            debugger;
            if ($(Col).hasClass("close")) {
                $(Col).addClass("open").slideDown(1000).removeClass("close");
                $(".btnCol").each(function () {
                    $(this).removeClass("active-btn");
                });
                $(Index).addClass("active-btn").addClass("open-btn");
                $('html, body').animate({
                    scrollTop: ($(Col).prev().offset().top)
                }, 1000);
            }
            else {

                $(Col).addClass("close").slideUp(1000).removeClass("open");
                $(Index).removeClass("active-btn").removeClass("open-btn");
            }
        }


        function ColMenuClick(Index, Col) {
            debugger;
            if ($(Index).hasClass("active-btn") && $(Index).hasClass("open-btn")) {
                $(Index).removeClass("active-btn").removeClass("open-btn");
                if ($(Col).hasClass("open")) {
                    $(Col).addClass("close").slideUp(1000).removeClass("open");
                }
            }
            else {
                if ($(Index).hasClass("open-btn")) {
                    $(".btnCol").each(function () {
                        $(this).removeClass("active-btn");
                    });
                    $(Index).addClass("active-btn");
                    $('html, body').animate({
                        scrollTop: ($(Col).prev().offset().top)
                    }, 1000);
                }
                else {
                    $(".btnCol").each(function () {
                        $(this).removeClass("active-btn");
                    });
                    $(Index).addClass("active-btn").addClass("open-btn");
                    if ($(Col).hasClass("close")) {
                        $(Col).addClass("open").slideDown(1000).removeClass("close");
                        $('html, body').animate({
                            scrollTop: ($(Col).prev().offset().top)
                        }, 1000);
                    }
                }
            }
        }


    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="col-menu">
        <div id="btnCol1" class="btnCol active-btn open-btn" onclick="ColMenuClick('#btnCol1','#collapes-1-body')">Col 1</div>
        <div id="btnCol2" class="btnCol" onclick="ColMenuClick('#btnCol2','#collapes-2-body')">Col 2</div>
        <div id="btnCol3" class="btnCol" onclick="ColMenuClick('#btnCol3','#collapes-3-body')">Col 3</div>
        <div id="btnCol4" class="btnCol" onclick="ColMenuClick('#btnCol4','#collapes-4-body')">Col 4</div>
        <div id="btnCol5" class="btnCol" onclick="ColMenuClick('#btnCol5','#collapes-5-body')">Col 5</div>
        <div id="btnCol6" class="btnCol" onclick="ColMenuClick('#btnCol6','#collapes-6-body')">Col 6</div>
        <div id="btnCol7" class="btnCol" onclick="ColMenuClick('#btnCol7','#collapes-7-body')">Col 7</div>
        <div id="btnCol8" class="btnCol" onclick="ColMenuClick('#btnCol8','#collapes-8-body')">Col 8</div>
        <div id="All" class="btnCol" onclick="CollapseAll();">All</div>
    </div>

    <div id="collapse-1" class="col">
        <div id="collapes-1-head" class="col-head" onclick="ShowHide('#btnCol1','#collapes-1-body');">Collapse 1<span class="arrow-down"></span></div>
        <div id="collapes-1-body" class="col-body open">
                <label for="email">Email:</label>
                <input id="email" name="email" type="email" />
                <button type="submit"> Submit Form </button>
                <br />
                <label for="someInput"> Your Name: </label>
                <input type="text" id="someInput" name="someInput" placeholder="Douglas Quaid" required autofocus/>
                <button type="submit">Go</button>
                <br />
                <label for="username">Create a Username: </label>
                <input type="text" name="username" id="username" placeholder="4 <> 10" pattern="[A-Za-z]{4,10}" autofocus required>
                <button type="submit">Go </button>

            <h3> Search Results </h3>
            <p> They were interrupted, just after Quato said, <mark>"Open your Mind"</mark>. </p>

            <br />

            <h1> Total Recall Awesomness Gauge </h1>
            <input type="range" name="range" min="0" max="10" step="1" value=""/>
            <output name="result">  </output>
            <br />
            <p contenteditable="true">Click here to edit this content!</p>
        </div>
    </div>

    <div id="collapse-2" class="col">
        <div id="collapes-2-head" class="col-head" onclick="ShowHide('#btnCol2','#collapes-2-body');">Collapse 2<span class="arrow-down"></span></div>
        <div id="collapes-2-body" class="col-body close"></div>
    </div>

    <div id="collapse-3" class="col">
        <div id="collapes-3-head" class="col-head" onclick="ShowHide('#btnCol3','#collapes-3-body');">Collapse 3<span class="arrow-down"></span></div>
        <div id="collapes-3-body" class="col-body close"></div>
    </div>

    <div id="collapse-4" class="col">
        <div id="collapes-4-head" class="col-head" onclick="ShowHide('#btnCol4','#collapes-4-body');">Collapse 4<span class="arrow-down"></span></div>
        <div id="collapes-4-body" class="col-body close"></div>
    </div>

    <div id="collapse-5" class="col">
        <div id="collapes-5-head" class="col-head" onclick="ShowHide('#btnCol5','#collapes-5-body');">Collapse 5<span class="arrow-down"></span></div>
        <div id="collapes-5-body" class="col-body close"></div>
    </div>

    <div id="collapse-6" class="col">
        <div id="collapes-6-head" class="col-head" onclick="ShowHide('#btnCol6','#collapes-6-body');">Collapse 6<span class="arrow-down"></span></div>
        <div id="collapes-6-body" class="col-body close"></div>
    </div>

    <div id="collapse-7" class="col">
        <div id="collapes-7-head" class="col-head" onclick="ShowHide('#btnCol7','#collapes-7-body');">Collapse 7<span class="arrow-down"></span></div>
        <div id="collapes-7-body" class="col-body close"></div>
    </div>

    <div id="collapse-8" class="col">
        <div id="collapes-8-head" class="col-head" onclick="ShowHide('#btnCol8','#collapes-8-body');">Collapse 8<span class="arrow-down"></span></div>
        <div id="collapes-8-body" class="col-body close"></div>
    </div>

</asp:Content>

