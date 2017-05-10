/// <reference path="jquery-3.1.1.intellisense.js" />
/// <reference path="jquery-3.1.1.js" />
$(document).ready(function () {
    $.ajax({
        url: 'Content/articles.xml',
        dataType: 'xml',
        success: function (data) {
            var articles = $(data).find('article').each(function () {
                var main = $('#main');
                var article = $('<article></<article>');
                var h1 = $("<h1></h1>").text($(this).find('title').text());
                var h5 = $("<h5></h5>").text($(this).find('author').text());
                var img = $('<img src="' + $(this).find('Image').text() + '"/>');
                var p = $("<p></p>").text($(this).find('p').text());
                var section = $("<section></section>");
                section.append(img, p);
                article.append(h1, h5, section);
                main.append(article);
               
                
            });
           

        }
    });

    $("#menubar").click(function () {
        $("#menu").toggle(500);
        var arr = $(this).find("span");
        var show = arr[0];
        var hide = arr[1];
        $(show).toggle();
        $(hide).toggle();


    });
})
