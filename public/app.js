$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<div class='card-body'> <h5  class='card-title' data-id='" + data[i]._id + "'>" + data[i].title + "</h5>");

        $("#articles").append("<p class='card-text'>" + data[i].description + "</p>");

        $("#articles").append("<p class='card-text'> Author: " + data[i].author + "</p>");

        $("#articles").append("<a href='" + data[i].link + "' class='btn btn-primary'> Link to Article</a> </div>")
    };
});

$(document).on("click", "#noteBtn", function (){

    // $("#notes").empty();
    var thisId = this.attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }) .then(function (data){
        // for (j = 0; j <data.length; j++){
            $("#notes").append("<p>" + data[j].title + "</p>");
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data[j]._id + "' id='savenote'>Save Note</button>");

            if (data[i].note){
                $("#titleinput").val(data[0].note.title);
                $("#bodyinput").val(data[0].note.body);

            }
        // };
        
    })

})