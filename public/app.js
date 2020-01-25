$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<div class='card w-75'></div>" + "<div class='card-body card-general'> <h5  class='card-title' data-id='" + data[i]._id + "'>" + data[i].title + "</h5>" + "<p class='card-text'>" + data[i].description + "</p>" + "<p class='card-text'> Author: " + data[i].author + "</p>" + "<a href='" + data[i].link + "'> Link to the Article </a> " + "<button type='button' class='btn btn-info btn-sm' data-toggle='modal' data-target='#exampleModal'> Notes </button> </div>");
    };
});

$(document).on("click", "#noteBtn", function (){

    // $("#notes").empty();
    var thisId = this.attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }) .then(function (data){
        for (j = 0; j <data.length; j++){
            $("#notes").append("<p>" + data[j].title + "</p>");
            
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data[j]._id + "' id='savenote'>Save Note</button>");

            if (data[j].note){
                $("#titleinput").val(data[j].note.title);
                $("#bodyinput").val(data[j].note.body);

            }
        };
        
    })

})