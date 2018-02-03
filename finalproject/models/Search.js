function Search(){
  this.title="";
  this.year = "";
  this.genre="";
  this.language="";
  this.country="";
 
}

Search.prototype.searchMovies = function(){
  let searchURL = '';
  if (this.title !== '') {
    searchURL = "Title=" + this.title;
  }else if(this.year !== ''){
    searchURL = "Year=" + this.year;
  }else if(this.genre !== ''){
    searchURL ="Genre=" + this.genre;
  }else if(this.language !== ''){
    searchURL ="Language=" + this.language;
  }else if(this.country !== ''){
    searchURL = "Country=" + this.country;
  }
  console.log(searchURL);
  //if .. others
  return searchURL;
};