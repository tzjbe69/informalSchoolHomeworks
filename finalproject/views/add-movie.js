var addMovie = document.getElementById('submit');
addMovie.addEventListener('click',function(){
    var title = document.getElementsByName('title')[0].value;
    var year = document.getElementsByName('year')[0].value;
    var poster = document.getElementsByName('poster')[0].value;
    var movie = new Movie();
    movie.title = title;
    movie.year = year;
    movie.poster = poster;
    movie.addMovie();
})