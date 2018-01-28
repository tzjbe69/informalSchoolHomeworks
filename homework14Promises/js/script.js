document.addEventListener('DOMContentLoaded', onHTMLLoaded);

function onHTMLLoaded() {
    //Chuck Norris Jokes. Loading by typing the number of the joke
    jokesChuckNorris();
    //Email serever test. Press test to check after writing the server address
    emailTest();
    //QR generator. Generates an image - Not with $.ajax?
    var qrGenerator = document.getElementById('qr-generator');
    var qrField = document.getElementsByTagName('input')[3];
    var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
    var qr = document.getElementById('qr');
    qrGenerator.addEventListener('click', function() {
        qr.innerHTML = "<img src='" + qrUrl + qrField.value +"' alt='qr'/>";
    });
    //BEER I have to work on this one more.
    var beerUrl = 'https://api.punkapi.com/v2/beers/random';
    fetch(beerUrl, {method: "GET"}).then(function (response) {
        return response.json();
    }).then(function(response) {
        beerRandom(response);
    });
}

function jokesChuckNorris() {
    var showJoke = document.getElementById('show-joke');
    var item = document.createElement('p');
    var jokeField = document.getElementsByTagName('input')[0];
    var root='https://api.icndb.com/jokes/';
    var numberOfJokes = 0
    fetch(root + 'count', {
        method: 'GET'
    }).then(function(response){
        return(response.json());
    }).then(function(response){
        console.log(response.value)
        numberOfJokes = response.value;
    });
    jokeField.addEventListener('keyup', function() {
        var jokeNb = document.getElementsByTagName('input')[0].value;
        console.log(numberOfJokes)
        if(valid(jokeNb, numberOfJokes)) {
            
            fetch(root + jokeNb, {method: 'GET'}).then(function(response){
                return response.json();
            }).then(function(response){
                console.log(response.value)
                item.innerHTML = response.value.joke;
                showJoke.appendChild(item);
            });
        } else {
            item.innerHTML = "Please enter a valid number between 0 and " + numberOfJokes;
            showJoke.appendChild(item);
        }
    });
}

function valid(jokeNb, numberOfJokes) {
    if (jokeNb > 0 && jokeNb <= numberOfJokes) {
        return true;
    }
    return false;
}

function emailTest() {
    var testEmail = document.getElementById('check-email');
    var mailField = document.getElementsByTagName('input')[1];
    var mailUrl = 'https://api.mailtest.in/v1/';
    var mail = document.getElementById('show-mail');
    testEmail.addEventListener('click', function() {
        if (mailField.value == '') {
            mail.textContent = "Write something!!!!";
        } else {
            fetch(mailUrl + mailField.value, {method: 'GET'})
            .then(function(response){
                return response.json();
            }).then(function(response){
                mail.textContent = "The status of your server is " + response.status + ", and the domain is " + response.message;
            });
        }
    });
}

function beerRandom(response) {
    var beer = document.getElementById('random-beer');
    var malt = "";
    response[0].ingredients.malt.forEach(function (element) {
        malt += element.name + " " + element.amount.value + " " + element.amount.unit + "<br>"
    })
    var hops = "";
    response[0].ingredients.hops.forEach(function (element) {
        hops += element.name + " " + element.amount.value + " " + element.amount.unit + " Add at: " + element.add + "<br>"
    })
    beer.innerHTML = "<h3>" + response[0].name + "</h3><div id='text-content' class='pull-left'><p>With food: " + response[0].food_pairing + "</p>" +
        "<p>" + response[0].description + " It was first brewed at " + response[0].first_brewed + ".</p>" +
        "<h4>Ingredients</h4>" + "<p>Hops:<br>" + hops +  "</p><p>Malt:<br>" + malt + "</p>" +
        "<h4>Tips</h4><p>" + response[0].brewers_tips +"</p><p>By: " + response[0].contributed_by + "</p>" + 
        "</div><img class='pull-right' src='" + response[0].image_url + "' alt='beer' width='81px' height='316px'/>";
}

