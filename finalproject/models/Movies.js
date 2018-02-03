/*global fetch*/
function Movies() {
    this.moviesURL = "";
    this.title= "";
    this.numberOfMovies = 0;
}

Movies.prototype.getAllMovies = function() {
    let searchURL= 'https://ancient-caverns-16784.herokuapp.com/movies' + this.moviesURL;
    return fetch(searchURL + '', {method: 'GET'})
            .then((response) => response.json())
            .then((response) => response)
            .catch((err) => err);
};

Movies.prototype.getAfterRating = function () {
    let url = "https://ancient-caverns-16784.herokuapp.com/movies?take=" + this.numberOfMovies + "&skip=0";
    return fetch(url, {method: 'GET'})
            .then((response) => response.json())
            .then((response) => {
                response.results.sort((a, b) => Number(b).imdbRating - Number(a).imdbRating);
                return response.results;
                })
            .catch((err) => err);
};