    // JavaScript source code

    $(document).ready(function () {

      //load data into main
      load();

    //contstruct url parameters
    function constructUrl(category, param){
        //check if search box was clicked
    	if (param !=undefined) {
    		url = 'https://newsapi.org/v2/everything?' +  param + '&language=en&apiKey=e12e72b020064032a687304c8073ca69';
    		return url;
    	}
        //check if one of the tabs was clicked
    	else if (category!=undefined) {
    		url = 'https://newsapi.org/v2/top-headlines?category=' + category +'&language=en&apiKey=e12e72b020064032a687304c8073ca69';
    	     return url;
    	} 
        //else check request parameters for values
        else { 
    	params= getUrlParameters();
    	url = 'https://newsapi.org/v2/';
    	subUrl = "language=en&apiKey=e12e72b020064032a687304c8073ca69";
        if (params == null) {
        	url += "top-headlines?" + subUrl;
        	return url 
        }
         var group = params["group"]
         url += group + "?";

         //construct parameters
         for (var key in params) {
         	if (params.hasOwnProperty(key) && key !="group") {
              url += key + "=" + params[key] + "&";
         	}
         }

         url += subUrl;
      return url;
  }

    }


  //gets the url parameters
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

//Contains ajax call that loads data into main
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
                    var cUrl = $('<a class="ext_link" href="' + article.url + '"></a>');
                    var image_url = "images/placeholder.jpg";
                    if (article.urlToImage != null) {
                      image_url = article.urlToImage;
                    }
                     var image =  $('<div class="img-container"><img class="img-responsive" src="' + image_url+ '"/></div>');
                     var title = $('<p class="title"></p>').text(article.title);
                     box.append(src, image, title, author)
                     cUrl.append(box);
                     container.append(cUrl);


                });
                 main.html(container);
            }

        });
    }


    	
//closes the navigation meny when the 'x' is clixked
       $('#closebtn').click(function(){
         $('#mySideNav').css("visibility", "hidden");
       }
    });

//handles click event for tablinks
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

//called when user submits the search form
    $("#search-articles").submit(function (event) {
    	event.preventDefault();
    	param=  $( this ).serialize();
    	load(undefined, param)
    })

//shows the navigatiom menu when the mouse enters
    $("#popout").hover(function(){
    	 $('#mySideNav').css("visibility", "visible");
    });


//hides the navigation menu when the cursor leaves 
    $('#mySideNav').mouseleave(function(){
    	 $('#mySideNav').css("visibility", "hidden");
    });


    });
