// JavaScript source code
$(document).ready(function () {

    $("#menubar").click(function () {
        $("#menu").toggle(500);
        var arr = $(this).find("span");
        var show = arr[0];
        var hide = arr[1];
        $(show).toggle();
        $(hide).toggle();


    });
});
