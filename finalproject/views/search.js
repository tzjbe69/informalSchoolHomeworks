/* global makePagination Search  */

window.onload = function() {
    
    // const searchButton = document.getElementById("submit");
    //       searchButton.addEventListener('click', () => window.location.href = "search.html");
    
    const searchModel = new Search();
    document.getElementById("search-form").addEventListener("submit",function(event){
        event.preventDefault();
        
        const input = document.getElementById("query").value;
        
        searchModel.title=input;
        
        searchModel.searchMovies()
        .then(makePagination)
        .then(displaySearchMovies);

        
    });
    
    
    function displaySearchMovies(response){
        
        const container = document.getElementById("search-results");
        const template= document.querySelector(".art-container");
        document.getElementsByClassName('article')[0].innerHTML = "";
        container.innerHTML = "";
        
        
        for(let i = 0 ; i < response.length; i++){
            const results = template.cloneNode(true);
            const filmResult = response[i];
            const url = document.location.href.replace("home.html","movieDetails.html?movieId=") + filmResult._id;
            
            const filmTitle = results.querySelector(".search-title");
                  filmTitle.setAttribute('href', url);
                  filmTitle.innerHTML = filmResult.Title;
            
            const filmYear = results.querySelector(".search-year");
                  filmYear.innerHTML = filmResult.Year;
            
            const filmRunTime = results.querySelector(".search-runtime");
                  filmRunTime.innerHTML = filmResult.Runtime;
             
            const filmGenre = results.querySelector(".search-genre");    
                  filmGenre.innerHTML = filmResult.Genre;
                
            const filmPoster = results.querySelector(".search-poster");
                  filmPoster.setAttribute("src", filmResult.Poster);
                  filmPoster.setAttribute("alt", "No poster Available");
                  
                  filmPoster.innerHTML = filmResult.Poster;
            
            const anchorPoster = results.querySelector('.search-anchor');
        
                  anchorPoster.setAttribute('href', url);
                  anchorPoster.setAttribute('target', '_blank');
                  
            if(filmResult != undefined){
                container.append(results);
        }
    }
        
        
    }
    
    

};