var number = Math.floor((Math.random() * 100) + 1);
var count = 0;
var answer = true;
var yourAnswer = true;
var returnMessage = "";
var life = 10;

alert("We will play the game:\nGUESS THE NUMBER\nRules: I will pick a random number between 0 and 100 and you will have to guess it.\nYou have 10 lives. If you do not guess the number you will loose one life.\nAfter picking a number I will tell you if you choose correct or not. You can cancel it at any time.\nALSO I WILL TELL YOU IF YOUR NUMBER IS HIGHER OR LOWER THAN MINE!\nGOOD LUCK and DO NOT CHEET!!!")
while (answer && yourAnswer != null && life > 0){
    count++;
    yourAnswer = prompt("Guess the number between 1-100!\nYou have " + life + " lives left." + returnMessage);
    if (yourAnswer === ""){
        returnMessage = "\nEnter a valid number..."
    } else if (yourAnswer > 100 || yourAnswer < 0 ) {
        returnMessage = "\nEnter a number between 0 and 100...";
    } else if (yourAnswer < number) {
        returnMessage = "\n" + yourAnswer + " is lower than my number\nGUESS AGAIN";
    } else if (yourAnswer > number) {
        returnMessage = "\n" + yourAnswer + " is higher than my number\nGUESS AGAIN";
    } else if (yourAnswer == number) {
        answer = false;
        alert("YOU won!\n it is " + yourAnswer + ", you guessed my number in " + count + " tries");
        life++;
    } else {
        returnMessage = "\nEnter a valid number..."
    }
    life--;
    if (life == 0) {
        alert("You loose! My number is " + number + " Click refresh to try again")
    }
}
console.log(number);
console.log(yourAnswer);