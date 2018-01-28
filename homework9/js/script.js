function play() {
    var userRandom = Math.round(Math.random() * 2); //User
    playOn(userRandom);
}

function playOn(userPick) {
    var computerPick = Math.round(Math.random() * 2); //Computer
    var pieces = ['rock', 'paper', 'scissors']; //array
    var result = 0; //Am nevoie pentru a face cu %
    console.log("Computer choice: " + pieces[computerPick]);
    console.log("User choice: " + pieces[userPick]);
    //Am folosit metoda asta pentru ca mi se parea mai usoara la inceput... dar am vazut ca la JS e altfel, si mai bine am 
    //cautat rezolvarea prin % decat sa scriu atatea if/else :) sper ca nu e problema mare...
    if (computerPick - userPick < 0)
        result = (computerPick - userPick) + 3; //La numere negative alt rezultat la % stiam. Asa ca pentru cazul meu l-am facut manual sa imi dea bine %.
    else
        result = computerPick - userPick; //cand nu e negativ
    if (result % 3 == 0)
        console.log("It's tie!");
    else if (result % 3 == 1)
        console.log("Computer wins!");
    else
        console.log("User wins!"); //am vazut ca merge si fata paranteze acolada...
}
play(); //PLAY ON!

alert("Hello, am doua variante si le-am adaptat putin. Ambele functioneaza:\nPrima poti scrie in consola play() si va merge\nA doua scrii aici r, p sau s.\nHAVE FUN")
var user = "0";
while(user != null){
    var user = prompt("Let's play Rock, paper, scissors.\n Enter r, p or s and hit OK\nLook in console ;)");
    var userChoice;
    if(user == 'r') {
        userChoice = 0;
        playOn(userChoice);
    } else if (user == 'p') {
        userChoice = 1;
        playOn(userChoice);
    } else if (user == 's') {
        userChoice = 2;
        playOn(userChoice);
    } else {
        userChoice = 3;
    }
    
}