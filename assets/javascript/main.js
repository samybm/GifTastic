

let charArray = ['Dennis Reynolds', 'Charlie Kelly','Frank Reynolds', 'Ronald (Mac) McDonald', 'Deandra (Sweet Dee) Reynolds'];

function makeButtons () {
    $('#buttons').empty();

    for (let i = 0; i < charArray.length; i++) {
        let $btn = $('<button>');
        $btn.addClass('char');
        $btn.attr('data-name', charArray[i]);
        $btn.text(charArray[i]);
        $('#buttons').append($btn);
    }
}

$('#addChar').on('click', function () {
    const char = $('#char-input').val().trim(); 
    charArray.push(char);
    makeButtons();
    return false;
})

function displayGif () {
    const char = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + char + "&api_key=zgkkPAP6vK95fDAxYnEgIGjatLmLLVE3&limit=10";

    $.ajax({url: queryURL, method: 'GET'}).done(function (response) {
        console.log(response.data);

        let results = response.data;

        for (let i = 0; i < results.length; i++) {
            const gifDiv = $('<div class="gif">');
            const charGif = $('<img>');

            charGif.attr('src', results[i].images.fixed_height_still.url);
            charGif.attr('title', "Rating: " + results[i].rating);
            charGif.attr('data-still', results[i].images.fixed_height_still.url);
            charGif.attr('data-state', 'still');
            charGif.addClass('gif');
            charGif.attr('data-animate', results[i].images.fixed_height.url);

            gifDiv.append(charGif);

            $('#gif-view').prepend(gifDiv);
        }
    })
}

$(document).on('click', '.gif', function () {
    let state = $(this).attr('data-state');

    if (state = 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', $(this).data('still'));
    }
})

$(document).on('click', '.char', displayGif);

makeButtons();