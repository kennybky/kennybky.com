// JavaScript source code
$(document).ready(function () {
    $.ajax({
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
        dataType: "xml",
        success: function (data) {
            var items = $(data).find("item").each(function () {
                var main = $('#main');
                var article = $('<article></<article>');
                article.append("<header>" + $(this).find("title").text() + "</header>");




            });

        }

    });


});
