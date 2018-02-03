/*global Movies hideOrDisplay logOutFunction history Search */

window.onload = function() {
    const buttonLogOut = document.getElementById('logout');
    const buttonLogIn = document.querySelector('.signin');
    const registerText = document.querySelector('.register-text');
    const addBtn = document.getElementById('addBtn');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');

    const buttonAbout = document.querySelector('.about');
    const buttonHome = document.querySelector('.homebutton');

    Utils.ready();
    buttonLogIn.addEventListener('click', () => window.location.href = "login.html");
    buttonLogOut.addEventListener('click', logOutFunction);

    hideOrDisplay(registerText);
    hideOrDisplay(buttonLogIn, buttonLogOut);
    hideOrDisplay(buttonLogIn, addBtn);

    addBtn.addEventListener('click', () => window.location.href = "addMovie.html");
    prevPage.addEventListener('click', function() {
        let attrOfPage = prevPage.getAttribute('data-prev-page').split('?')[1];
        addHistory(attrOfPage);
        moveTo(attrOfPage);
    });

    nextPage.addEventListener('click', function() {
        let attrOfPage = nextPage.getAttribute('data-next-page').split('?')[1];
        addHistory(attrOfPage);
        moveTo(attrOfPage);
        });

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event){
        event.preventDefault();

// HERE SEARCH OPTIONS
// IF You Want make it as separate function
        const input = document.getElementById('query');
        let advanced = document.getElementById('advanced').value;

        let search = new Search();

        search[advanced] = input.value;
 
        if(input.value !== "" && input.value.replace(/\s/g, '').length) {
            input.value = '';
            addHistory(search.searchMovies());
            moveTo(search.searchMovies());
        }
    });

    window.onpopstate = () => (moveTo(window.location.href.split('?')[1]));

    getMoviesAfterRating();

    moveTo(window.location.href.split('?')[1]);
    // START display/hide div search-section
    const searchIcon = document.getElementById("search-icon");
    const searchSection = document.getElementById("search-section");
    searchIcon.addEventListener('click', toggleSearchBox);

    function toggleSearchBox(){

        if (searchSection.classList.contains("visible")){
            searchSection.classList.remove("visible");
        } else {
            searchSection.classList.add("visible");
        }
    }
    // END display/hide div search-section
};

function moveTo(page) {
    if (page == undefined) {
        page = '';
    }
    if (page !== null) {
        let moviesListNew = new Movies();
        page != '' ? moviesListNew.moviesURL = '?' + page : moviesListNew.moviesURL = page;
        moviesListNew.getAllMovies().then(makePagination).then(displayMovies);
    }
}

function makePagination(moviesArray) {
    if (moviesArray == "TypeError: Failed to fetch") {
        return "error";
    }

    const prevPage = document.getElementById('prev-page');
    const thisPage = document.getElementById('current-page');
    const nextPage = document.getElementById('next-page');

    prevPage.setAttribute("data-prev-page", moviesArray.pagination.links.prev);
    nextPage.setAttribute("data-next-page", moviesArray.pagination.links.next);
    thisPage.setAttribute("data-current-page", moviesArray.pagination.links.self.split('?')[1]);

    thisPage.innerHTML = "Page " + moviesArray.pagination.currentPage;
    if (moviesArray.pagination.numberOfPages > 1) {
        thisPage.innerHTML += " out of " + moviesArray.pagination.numberOfPages;
    } 
    moviesArray.pagination.currentPage === moviesArray.pagination.numberOfPages ? nextPage.style.display = 'none' : nextPage.style.display = 'block';
    (moviesArray.pagination.currentPage == 1 || moviesArray.pagination.currentPage == 0) ? prevPage.style.display = 'none' : prevPage.style.display = 'block';
    window.scrollTo(0, 0);
    return moviesArray.results;
}

function displayMovies(moviesList) {
    if (moviesList === "error") {
        document.getElementById('loading').innerHTML = "THERE IS A SERVER ERROR PLEASE TRY AGAIN LATER";
        return ;
    }
    let articleElement = document.getElementsByClassName('article');
    articleElement[0].innerHTML = "";
    for (let i = 0; i < moviesList.length; i++) {
        
        let itemWrapper = document.createElement('div');
        let anchorTitleEl = document.createElement('a');
        let anchorImageEl = document.createElement('a');
        
        let titleElement = document.createElement('h3');
        let imageElement = document.createElement('img');
        let imdbNoteElement = document.createElement('p');
        let genreElement = document.createElement('p');

        let url = "movieDetails.html?movieId=" + moviesList[i]._id;
        
        anchorTitleEl.setAttribute('href', url);
        // anchorTitleEl.setAttribute('target', '_blank');
        
        anchorImageEl.setAttribute('href', url);
        // anchorImageEl.setAttribute('target', '_blank');
        if (moviesList[i].Title == undefined || moviesList[i].Title == '') {
            moviesList[i].Title = "NO MOVIE TITLE";
        }       
        titleElement.innerHTML = moviesList[i].Title + ' (' + moviesList[i].Year + ')';
        if (moviesList[i].Poster == 'N/A') {
            moviesList[i].Poster = "../images/no-poster.jpg";
        }
        imageElement.setAttribute('src', moviesList[i].Poster);
        imageElement.setAttribute('alt', 'No poster Available');
        imageElement.setAttribute('height', 269);
        imageElement.setAttribute('width', 183);
        imdbNoteElement.innerHTML = 'IMDB Rating: ' + moviesList[i].imdbRating + '/10' + ' ('+ moviesList[i].imdbVotes + ' votes)';
        genreElement.innerHTML = 'Genre: ' + moviesList[i].Genre;
        
        if (moviesList[i].Genre == undefined) {
            genreElement.innerHTML = 'Genre: Information Not Available';       
        }
        
        if(moviesList[i].imdbRating == undefined && moviesList[i].imdbVotes == undefined) {
            imdbNoteElement.innerHTML =  'IMDB Rating: Information Not Available';
        }
        
        anchorTitleEl.appendChild(titleElement);
        anchorImageEl.appendChild(imageElement);


        articleElement[0].appendChild(itemWrapper);
        itemWrapper.appendChild(anchorTitleEl);
        itemWrapper.appendChild(anchorTitleEl);
        itemWrapper.appendChild(anchorImageEl);
        itemWrapper.appendChild(imdbNoteElement);
        itemWrapper.appendChild(genreElement);
    }
}

function addHistory (currPage) {
    history.pushState({}, "mynew page", "?" + currPage);
}

function getMoviesAfterRating() {
    let movieAfterRating = new Movies();
    movieAfterRating.getAllMovies()
    .then(function(response) {
        movieAfterRating.numberOfMovies = response.pagination.numberOfPages * 10;
        return movieAfterRating.getAfterRating();
        })
    .then(function(response) {
        let topMovies = document.getElementById('top-movies');
        let listOfMovies = document.createElement('ol');
        for(let i = 0; i < 10; i++){
            let listItem = document.createElement('li');
            listItem.innerHTML = "<a href=movieDetails.html?movieId=" + response[i]._id + " target='_blank'>"+response[i].Title+"</a>";
            listOfMovies.appendChild(listItem);
        }
        topMovies.appendChild(listOfMovies);
    });
}
