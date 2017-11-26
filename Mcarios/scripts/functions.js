// JavaScript source code

$(document).ready(function () {



  load();


function constructUrl(category, param){
	if (param !=undefined) {
		url = 'https://newsapi.org/v2/everything?' +  param + '&language=en&apiKey=e12e72b020064032a687304c8073ca69';
		return url;
	}
	if (category!=undefined) {
		url = 'https://newsapi.org/v2/top-headlines?category=' + category +'&language=en&apiKey=e12e72b020064032a687304c8073ca69';
	     return url;
	}
	params= getUrlParameters();
	url = 'https://newsapi.org/v2/';
	subUrl = "language=en&apiKey=e12e72b020064032a687304c8073ca69";
    if (params == null) {
    	url += "top-headlines?" + subUrl;
    	return url 
    }
     var group = params["group"]
     url += group + "?";
     for (var key in params) {
     	if (params.hasOwnProperty(key) && key !="group") {
          url += key + "=" + params[key] + "&";
     	}
     }

     url += subUrl;
  return url;

}



function getUrlParameters() {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&');

        if (sURLVariables[0] == "") {
        	return null;
        }

      params = new Object();
      $.each(sURLVariables, function(i, val) {
        var sParam = val.split('=');
        params[sParam[0]]=  sParam[1];
      });
        return params;
    }

function load(category, param) { 
       url = constructUrl(category, param);
$.ajax({
        url: url,
        dataType: 'json',
        type: "GET",
        success: function (data) {
            var main = $('#main');
            var container = $('<section id="article-container"></<section>');
            var articles = data.articles;
            $.each(articles, function(i, article){
            	if (i > 50) {
            		return false;
            	}
            	var box = $("<div class='box'></div>");
                 var src = $('<p class="source"></p>').text("Source" + ": " + article.source.name);
                 var author = $('<p class="author"></p>').text("by" + " " +article.author);
                var url = $('<a class="ext_link" href="' + article.url + '"></a>');
                var image_url = "images/placeholder.jpg";
                if (article.urlToImage != null) {
                  image_url = article.urlToImage;
                }
                 var image =  $('<div class="img-container"><img class="img-responsive" src="' + image_url+ '"/></div>');
                 var title = $('<p class="title"></p>').text(article.title);
                 box.append(src, image, title, author)
                 url.append(box);
                 container.append(url);


            });
             main.html(container);
        }

    });
}


	

   $('#closebtn').click(function(){
     $('#mySidenav').css("width", "0");
});

 $('#openbtn').click(function(){
     $('#mySidenav').css("width", "250px");
});

$(".tablinks").click(function(evt){
   var i, tabcontent, tablinks;
    tablinks = $(".tablinks");
    elem = evt.target;
    data = $(elem).attr("data-name");
    if (data !="more") {
    $(tablinks).each(function(){
        $(this).removeClass("active");
    });
    console.clear();
    load(data);
}
    
    $(elem).addClass("active");

    
});

$("#search-articles").submit(function (event) {
	event.preventDefault();
	param=  $( this ).serialize();
	load(undefined, param)
})

$("#popout").hover(function(){
	 $('#mySideNav').css("visibility", "visible");
});

$('#mySideNav').mouseleave(function(){
	 $('#mySideNav').css("visibility", "hidden");
	  $('#popout').removeClass("active");
});








});
