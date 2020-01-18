/// <reference path="jquery-3.1.1.js" />
/// <reference path="jquery.cycle.all.js" />
/// <reference path="mustache.js" />


$(document).ready(function () {
    $.ajax({
        type: 'GET',
        cache: 'false',
        url: 'scripts/info.json',
        success : function (data) {
            var template = $('#speakerstpl').html();
            var html = Mustache.to_html(template, data);
            $('#carousel').html(html);
            console.log(html);
            $('#carousel').cycle({
                fx: 'fade',
                pause: 1,
                next: '#next_btn',
                prev: '#prev_btn',
                speed: 500,
                timeout: 10000
            });
        }
    });

    var vid = document.getElementById('samplevid');


    function pause() {
        vid.pause();
    }
    function rewind() {
        vid.currentTime -= 5;
    }

    function forward() {
        vid.currenttime += 5;
    }

    $('#play').click(function() {
        vid.play();
    })



});