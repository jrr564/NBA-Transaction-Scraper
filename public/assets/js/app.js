$(document).ready(function () {

    $(".scrape").click(function (event) {
        event.preventDefault();
        $.get("/api/fetch").then(function (data) {
            $(".articles").remove();
            $.get("/").then(function () {
                bootbox.alert("<h2 class='text-center'>" + data.message + "<h2>", function (result) {
                    location.reload()
                });
            });
            location.reload();
        });
    });

    $(".save-article").click(function () {
        var articleToSave = {};
        articleToSave.id = $(this).data("id");
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        }).then(function (data) {
            location.reload();
        });
    });

    $(".removeSaved").click(function () {
        var articleToremoveSaved = {};
        articleToremoveSaved.id = $(this).data("id");
        articleToremoveSaved.saved = false;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToremoveSaved
        }).then(function (data) {
            location.reload();
        });
    });

    $('.saved-buttons').on('click', function () {
        // transaction id
        var thisId = $(this).attr("data-value");
        //attach id to the save button in the modal for use in save post
        $("#saveButton").attr({ "data-value": thisId });
        //make an ajax call for the notes attached to this article
        $.get("/notes/" + thisId, function (data) {
            console.log(data);
            //empty modal title, textarea and notes
            $('#noteModalLabel').empty();
            $('#notesBody').empty();
            $('#notestext').val('');
            //add notes to body of modal, loop if more thn one
            for (var i = 0; i < data.note.length; i++) {
                var button = ' <a href=/deleteNote/' + data.note[i]._id + '><i class="pull-right deletex" aria-hidden="true"></i></a>';
                $('#notesBody').append('<div class="panel panel-default"><div class="noteText panel-body">' + data.note[i].body + '  ' + button + '</div></div>');
            }  
        });
    });

    // click save button
    $(".savenote").click(function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-value");
        //  POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/notes/" + thisId,
            data: {
                body: $("#notestext").val().trim()
            }
        })
            .done(function (data) {
                $('#noteModal').modal('hide');

            });
    });
});