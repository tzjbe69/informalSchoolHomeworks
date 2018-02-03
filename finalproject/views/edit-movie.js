/* global getCookies */
/* global Movie */

function submit() {
      const title = document.getElementById("movie-title"),
            plot = document.getElementById("movie-plot"),
            year = document.getElementById("movie-year"),
            released = document.getElementById("released"),
            genre = document.getElementById("movie-genre"),
            imdbNote = document.getElementById("imdb-note"),
            imdbVotes = document.getElementById("imdb-votes"),
            rated = document.getElementById("movie-rates"),
            directors = document.getElementById("movie-directors"),
            actors = document.getElementById("movie-actors"),
            runtime = document.getElementById("movie-runtime"),
            writer = document.getElementById("movie-writer"),
            language = document.getElementById("movie-language"),
            country = document.getElementById("movie-country"),
            awards = document.getElementById("movie-awards"),
            production = document.getElementById("movie-production"),
            metascore = document.getElementById("movie-metascore"),
            website = document.getElementById("movie-website"),
            type = document.getElementById("movie-type");
            poster = document.getElementById("poster");
            

      const data = {
            Title: title.value,
            Plot: plot.value,
            Year: year.value,
            Released: released.value,
            Genre: genre.value,
            Rated: rated.value,
            IMDBNote: imdbNote.value,
            IMDBVotes: imdbVotes.value,
            Directors: directors.value,
            Writer: writer.value,
            Actors: actors.value,
            Runtime: runtime.value,
            Language: language.value,
            Country: country.value,
            Awards: awards.value,
            Production: production.value,
            Metascore: metascore.value,
            Website: website.value,
            Type: type.value,
            Poster: type.poster
      };

      const movie = new Movie();
      const token = getCookies().accessCookie;

      movie.editMovie(data, token);
}

// When "Edit" button is clicked
function on() {
      document.getElementById("overlay").style.display = "block";

      const movieModel = new Movie();
      movieModel.getMovieDetails().then(() => {
            const title = document.getElementById("movie-title"),
                  plot = document.getElementById("movie-plot"),
                  year = document.getElementById("movie-year"),
                  rated = document.getElementById("movie-rates"),
                  released = document.getElementById("released"),
                  genre = document.getElementById("movie-genre"),
                  imdbNote = document.getElementById("imdb-note"),
                  imdbVotes = document.getElementById("imdb-votes"),
                  directors = document.getElementById("movie-directors"),
                  writer = document.getElementById("movie-writer"),
                  actors = document.getElementById("movie-actors"),
                  runtime = document.getElementById("movie-runtime"),
                  language = document.getElementById("movie-language"),
                  country = document.getElementById("movie-country"),
                  awards = document.getElementById("movie-awards"),
                  production = document.getElementById("movie-production"),
                  metascore = document.getElementById("movie-metascore"),
                  website = document.getElementById("movie-website"),
                  type = document.getElementById("movie-type"),
                  poster = document.getElementById("poster");
      
            title.value = movieModel.title;
            plot.value = movieModel.plot;
            year.value = movieModel.year;
            rated.value = movieModel.rated;
            released.value = movieModel.released;
            genre.value = movieModel.genre;
            imdbNote.value = movieModel.imdbNote;
            imdbVotes.value= movieModel.imdbVotes;
            runtime.value = movieModel.runtime;
            directors.value = movieModel.directors;
            writer.value = movieModel.writer;
            actors.value = movieModel.actors; 
            language.value = movieModel.language; 
            country.value = movieModel.country; 
            awards.value = movieModel.awards; 
            production.value = movieModel.production; 
            metascore.value = movieModel.metascore;
            website.value = movieModel.website;
            type.value = movieModel.type;
            poster.value = movieModel.poster;
      });
}   

function off(event) {
      event.preventDefault();
      document.getElementById("overlay").style.display = "none";
}
