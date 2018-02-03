/*global Movie fetch*/
/*global getCookies*/

/*global $*/

function Movie() {
    this.id=null;
    this.title="";
    this.year="";
    this.rated="";
    this.released="";
    this.runtime="";
    this.genre="";
    this.director="";
    this.writer="";
    this.actors="";
    this.plot="";
    this.language="";
    this.country="";
    this.awards="";
    this.imdbRating="";
    this.poster="../images/no-poster.jpg";
    this.metascore="";
    this.imdbRating="";
    this.imdbVotes="";
    this.imdbID="";
    this.type="";
    this.dvd="";
    this.boxOffice="";
    this.production="";
    this.website="";
    this.response="";
}

Movie.prototype.getMovieDetails = function() {
    var that = this;
    var movieId = getMovieIdFromURL();
    console.log(movieId);
    console.log(getMovieIdFromURL);
    var root = 'https://ancient-caverns-16784.herokuapp.com/movies/';
    
    return fetch(root + movieId, {
     method: 'GET'
    })
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data) {
            that.title=data.Title;
            that.poster=data.Poster;
            that.year=data.Year;
            that.rated=data.Rated;
            that.released=data.Released;
            that.runtime=data.Runtime;
            that.genre=data.Genre;
            that.director=data.Director;
            that.writer=data.Writer;
            that.actors=data.Actors;
            that.plot=data.Plot;
            that.language=data.Language;
            that.country=data.Country;
            that.awards=data.Awards;
            that.metascore=data.Metascore;
            that.imdbRating=data.imdbRating;
            that.imdbVotes=data.imdbVotes;
            that.imdbID=data.imdbID;
            that.type=data.Type;
            that.dvd=data.DVD;
            that.boxOffice=data.boxOffice;
            that.production=data.Production;
            that.website=data.Website;
            that.response=data.Response;
            that.totalSeasons=data.totalSeasons;
            that.ratings=data.Ratings;
            that.id=data._id;
    });
}

Movie.prototype.editMovie = function(data, token) {
    const root = 'https://ancient-caverns-16784.herokuapp.com/';
    const accessCookie = getCookies().accessCookie;
    var movieId = getMovieIdFromURL();
    console.log(movieId);

    console.log("editMovie - request url ... ", root + 'movies/' + movieId);
   
    
    $.ajax({
        url: root + 'movies/' + movieId,
        method: "PUT",
        beforeSend: function(request) {
        request.setRequestHeader("x-auth-token", accessCookie);
        },
        data: data,
        sucess: function(res){
            console.log(res);
        }
    });
}

// Implement "Delete" movie functionality

Movie.prototype.deleteMovie = function() {
    const movieId = getMovieIdFromURL(),
		  pageURL = "https://ancient-caverns-16784.herokuapp.com/";
	
    return fetch(pageURL + 'movies/' + movieId , {
        method: 'DELETE',
        headers: { 'x-auth-token': getCookies().accessCookie},
    })
    .then(response => {
		if(response.ok) return "OK";
        else return response.json();
    })
    .then(function(response) {
		if(response !== "OK") window.alert(response.message);
		else{
			//redirect to homepage.
			//gets the array in from of ["http:","", "something", "page"].
			//for : http://something/page (works generally).
			let placeholder = window.location.href.split("/");
			placeholder.pop();
			window.location.href = placeholder.join("/") + "/home.html";
		}
	});
}

Movie.prototype.addMovie = function() {
    $.ajax({
            url:'https://ancient-caverns-16784.herokuapp.com/movies/',
            method: "POST",
            beforeSend: function(request) {
            request.setRequestHeader("x-auth-token", getCookies().accessCookie);
            },
            data: {Title:this.title, Year:this.year, Poster:this.poster},
            success: function(res){
                console.log(res);
                window.location.href= "home.html";
            }
        });    
}