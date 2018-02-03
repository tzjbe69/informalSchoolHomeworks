/*global Movie fetch*/

document.addEventListener("DOMContentLoaded", onHtmlLoaded);

function onHtmlLoaded() {
    const buttonLogOut = document.getElementById('logout');
    const buttonLogIn = document.querySelector('.signin');
    const buttonAdd = document.getElementById('addBtn');
    const buttonDelete = document.getElementById('deleteBtn');
    const buttonEdit = document.getElementById('editBtn');
    var movieModel = new Movie();
    movieModel.getMovieDetails()
    .then(displayMovie);

    document.getElementById('cancel').addEventListener('click', off);
    function displayMovie() {
        
        var contentEl = document.getElementById('movie-display');
        
        var movieEl = document.createElement('article');
        
        String.prototype.sprintf = function() {
            var counter = 0;
            var args = arguments;
        
            return this.replace(/%s/g, function() {
                return args[counter++];
            });
        };
        
        var movieHtml = [];
        movieHtml['title'] = '<h2>%s</h2>';
        movieHtml['poster'] = '<img src="%s"/>';
        movieHtml['year'] = '<p>Year: %s </p>';
        movieHtml['plot'] = '<p id="plot-style">Plot: %s</p>';
        movieHtml['actors'] = '<p>Cast: %s</p>';
        movieHtml['country'] = '<p>Country: %s</p>';
        movieHtml['director'] = '<p>Director: %s</p>';
        movieHtml['genre'] = '<h4 class="inline-details"> %s </h4>';
        movieHtml['language'] = '<p>Language: %s</p>';
        movieHtml['metascore'] = '<p>Metascore: %s</p>';
        movieHtml['rated'] = '<h4 class="inline-details"> %s | </h4>';
        movieHtml['ratings']= '<p>Ratings: %s</p>';
        movieHtml['released'] = '<h4 class="inline-details"> %s | </h4>';
        movieHtml['response'] = '<p>Response: %s</p>';
        movieHtml['runtime'] = '<h4 class="inline-details"> %s | </h4>';
        movieHtml['type'] = '<p>Type: %s</p>';
        movieHtml['writer'] = '<p>Writer: %s</p>';
        movieHtml['imdbID'] = '<p>Imdb ID: %s</p>';
        movieHtml['imdbRating'] = '<p>IMDB Rating: %s</p>';
        movieHtml['imdbVotes'] = '<p>IMDB Votes: %s</p>';
        movieHtml['totalSeasons'] = '<p>Total Seasons: %s</p>';
        movieHtml['id'] = '<p>ID: %s</p>';
        movieHtml['production'] = '<p>Production: %s</p>';
        movieHtml['dvd'] = '<p>DVD: %s</p>';
        movieHtml['boxOffice'] = '<p>boxOffice: %s</p>';
        movieHtml['website'] = '<a href="%s">Website</a>';
        movieHtml['awards'] = '<p>Awards: %s</p>';
        
        for (let key in movieModel) {
            if (movieModel[key] !== undefined && movieModel[key] !== "N/A" && typeof movieModel[key] !== "function" && key !== 'id' && key !== 'response' && key !== 'ratings' && key !=='imdbID' && key!== 'year') {
                var value = movieHtml[key].sprintf(movieModel[key]);
                movieEl.innerHTML += value;
            }
            
            if (movieModel["poster"] == 'N/A') {
            movieModel["poster"] = "../images/no-poster.jpg";
            }
        }
        contentEl.appendChild(movieEl);
    }
    Utils.ready();
    hideOrDisplay(buttonLogIn, buttonLogOut);
    hideOrDisplay(buttonLogIn, buttonAdd);
    hideOrDisplay(buttonLogIn, buttonEdit);
    hideOrDisplay(buttonLogIn, buttonDelete);
}
