// JavaScript source code
$(document).ready(function () {
    $.ajax({
        url: 'https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=e12e72b020064032a687304c8073ca69',
        dataType: 'json',
        success: function (data) {
            var main = $('#main');
            var articles = data.articles;
            for (var i = 0; i < articles.length; i++) {
                var article = $('<article class="row"><<article>');
                var h1 = $('<h3 class="text-center"></h3>').text(articles[i].title);
                var h5 = $("<h5 class='text-right text-info'></h5>").text(articles[i].author);
                var img = $('<img class="img-responsive" src="' + articles[i].urlToImage + '"/>');
                var p = $("<p></p>").text(articles[i].description);
                var link = $('<a href="' + articles[i].url + '">(read more..)</a>');
                var section = $("<section></section>");
                p.append(link);
                section.append(h5,img, p);
                article.append(h1, section);
                main.append(article);

            }
        }

    });


});
