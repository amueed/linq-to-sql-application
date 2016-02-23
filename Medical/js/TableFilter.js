$(document).ready(function () {

    GetBooksCallAtClientSide();
});

$(function () {
    $(document).ajaxSend(function () { $("#container").hide("normal"); })
    $(document).ajaxComplete(function () { $("#container").show("normal"); })
});

$(function () {
    $("#tabs").tabs();
});

//$(function () {
//    $.ajax({
//        type: "POST",
//        url: "TableFilter.aspx/DisplayBooks",
//        data: {},
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: DisplayBooksSuccess,
//        error: function () {
//            debugger;
//            alert("Error Loading Data");
//        }
//    });
//})




function ByTitle() {
    debugger;
    var bookTitle = $("#FilterByTitle").val().toLowerCase();

    //Remove Highlight
    $("#tblBooksBody tr").each(function () {
        var content = $(this).find("td:eq(0)").html();
        content = content.replace('<span class="highlight">', '');
        content = content.replace('</span>', '');
        $(this).find("td:eq(0)").html(content);
    });

    //Store All Records
    var allRows = $("#tblBooksBody tr");

    //Show Filtered Records
    if (bookTitle.length > 0 && bookTitle != "") {
        allRows.hide();
        $(allRows).each(function () {
            var content = $(this).find("td:eq(0)").html().toLowerCase();
            var index = content.indexOf(bookTitle);
            if (index != -1) {
                $(this).show();
                content = $(this).find("td:eq(0)").html();
                content = content.substring(0, index) + "<span class='highlight'>" + content.substring(index, (index + bookTitle.length)) + "</span>" + content.substring((index + bookTitle.length), content.length);
                $(this).find("td:eq(0)").html(content);
            }
        });
    }
    //Show All Records
    if (bookTitle.length <= 0) {
        allRows.show();
    }
}

function ByAuthor() {
    debugger;
    var bookAuthor = $("#FilterByAuthor").val().toLowerCase();

    //Remove Highlight
    $("#tblBooksBody tr").each(function () {
        var content = $(this).find("td:eq(1)").html();
        content = content.replace('<span class="highlight">', '');
        content = content.replace('</span>', '');
        $(this).find("td:eq(1)").html(content);
    });

    //Store All Records
    var allRows = $("#tblBooksBody tr");

    //Show Filtered Records
    if (bookAuthor.length > 0 && bookAuthor != "") {
        allRows.hide();
        $(allRows).each(function () {
            var content = $(this).find("td:eq(1)").html().toLowerCase();
            var index = content.indexOf(bookAuthor);
            if (index != -1) {
                $(this).show();
                content = $(this).find("td:eq(1)").html();
                content = content.substring(0, index) + "<span class='highlight'>" + content.substring(index, (index + bookAuthor.length)) + "</span>" + content.substring((index + bookAuthor.length), content.length);
                $(this).find("td:eq(1)").html(content);
            }
        });
    }
    //Show All Records
    if (bookAuthor.length <= 0) {
        allRows.show();
    }
}

function ByPrice() {
    debugger;
    var bookPrice = $("#FilterByPrice").val().toLowerCase();

    //Remove Highlight
    $("#tblBooksBody tr").each(function () {
        var content = $(this).find("td:eq(2)").html();
        content = content.replace('<span class="highlight">', '');
        content = content.replace('</span>', '');
        $(this).find("td:eq(2)").html(content);
    });

    //Store All Records
    var allRows = $("#tblBooksBody tr");

    //Show Filtered Records
    if (bookPrice.length > 0 && bookPrice != "") {
        allRows.hide();
        $(allRows).each(function () {
            var content = $(this).find("td:eq(2)").html().toLowerCase();
            var index = content.indexOf(bookPrice);
            if (index != -1) {
                $(this).show();
                content = $(this).find("td:eq(2)").html();
                content = content.substring(0, index) + "<span class='highlight'>" + content.substring(index, (index + bookPrice.length)) + "</span>" + content.substring((index + bookPrice.length), content.length);
                $(this).find("td:eq(2)").html(content);
            }
        });
    }
    //Show All Records
    if (bookPrice.length <= 0) {
        allRows.show();
    }
}


function GetBooksCallAtClientSide() {
    debugger;
    //$.get("TableFilter.aspx", function (response) {
    //    debugger;
    //    var objBooks = $.parseJSON(response.d);
    //    alert(objBooks);
    //});

    $.ajax({
        type: "POST",
        url: "TableFilter.aspx/GetBooks",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: DisplayBooksSuccess,
        //function (data) {
        //var objBooks = $.parseJSON(data.d);
        //for (var i = 0; i < objBooks.length; i++) {
        //    //alert(objBooks[i].BookTitle + "," + objBooks[i].BookPrice);
        //}
        //},
        error: function () {
            debugger;
            alert("Error Loading Data");
        }
    });
}

function DisplayBooksSuccess(data) {
    var result = $.parseJSON(data.d);
    var htmlData = "";
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            htmlData += "<tr class='rowFilter'><td class='ByTitle'>" + result[i].BookTitle + "</td><td>" + result[i].BookAuthor + "</td><td align='center'>" + result[i].BookPrice + ".00</td></tr>";
        }
        $("#tblBooksBody").html(htmlData);

        $("#tblBooks thead tr:eq(1)").show();
    }
    else {
        $.notify("No Record Found", "error");
    }
}