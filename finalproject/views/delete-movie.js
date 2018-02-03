/*global $ Movie*/

document.addEventListener("DOMContentLoaded", _=>{
	document.getElementById("deleteBtn").onclick = _=> {
		const confirmation = window.confirm("Are you sure you want to delete movie?");
		if(confirmation){
			//delete the movie;
			const movie = new Movie();
			movie.deleteMovie();
		}
	}
});