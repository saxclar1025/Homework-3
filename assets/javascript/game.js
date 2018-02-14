const startingGuesses = 12;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const wordBank = [	"mario",
					"zelda",
					"samus",
					"yoshi",
					"starfox",
					"pikachu",
					"link",
					"ness",
					"luigi",
					"peach",
					"wario",
					"waluigi",
					"pacman",
					"sonic",
					"shadow" ];

const imageBank = [	"assets/images/mario.png",
					"assets/images/zelda.png",
					"assets/images/samus.png",
					"assets/images/yoshi.png",
					"assets/images/starfox.png",
					"assets/images/pikachu.png",
					"assets/images/link.png",
					"assets/images/ness.png",
					"assets/images/luigi.png",
					"assets/images/peach.png",
					"assets/images/wario.png",
					"assets/images/waluigi.png",
					"assets/images/pacman.png",
					"assets/images/sonic.png",
					"assets/images/shadow.png" ];

const songBank = [	"assets/audio/mario.mp3",
					"assets/audio/zelda.mp3",
					"assets/audio/samus.mp3",
					"assets/audio/yoshi.mp3",
					"assets/audio/starfox.mp3",
					"assets/audio/pikachu.mp3",
					"assets/audio/link.mp3",
					"assets/audio/ness.mp3",
					"assets/audio/luigi.mp3",
					"assets/audio/peach.mp3",
					"assets/audio/wario.mp3",
					"assets/audio/waluigi.mp3",
					"assets/audio/pacman.mp3",
					"assets/audio/city-escape.mp3",
					"assets/audio/live-and-learn.mp3" ];

var currentWordIndex = 0;
var currentWord = wordBank[0];
var guessesLeft = startingGuesses;
var wins = 0;
var lettersGuessed = [];
var guessProgress = [];

var updateGuessProgress = function() {
	var progress = "";
	var letters = "";
	for (var i = 0; i < currentWord.length; i++) {
		if (guessProgress[i]) {
			progress = progress + currentWord.charAt(i) + " ";
		}
		else {
			progress = progress + "_ ";
		}
	}
	for (var i = 0; i < lettersGuessed.length; i++) {
		letters = letters + lettersGuessed[i] + " ";
	}
	document.getElementById("guessing-progress").innerHTML = progress;
	document.getElementById("guesses-remaining").innerHTML = guessesLeft;
	document.getElementById("letters-guessed").innerHTML = letters;
}

var resetGame = function() {
	currentWordIndex = Math.floor(Math.random() * wordBank.length);
	currentWord = wordBank[currentWordIndex];
	guessProgress = [];
	for (var i = 0; i < currentWord.length; i++) {
		guessProgress.push(false);
	}
	guessesLeft = startingGuesses;
	lettersGuessed = [];
	updateGuessProgress();
}

var processGuess = function(guess) {
	if (lettersGuessed.indexOf(guess) < 0) {
		if (currentWord.indexOf(guess) < 0) {
			guessesLeft--;
		}
		else {
			for (var i = 0; i < currentWord.length; i++) {
				if (guess == currentWord.charAt(i)) {
					guessProgress[i] = true;
				}
			}
		}
		lettersGuessed.push(guess);
	}
	updateGuessProgress();
}

var processWin = function() {
	wins ++;
	document.getElementById("solution").innerHTML = currentWord.toUpperCase();
	document.getElementById("image").src = imageBank[currentWordIndex];
	document.getElementById("number-of-wins").innerHTML = wins;
	document.getElementById("music").src = songBank[currentWordIndex];
	document.getElementById("music").play();
}

document.onkeyup = function(event) {
	if (alphabet.indexOf(event.key) >= 0) {
		processGuess(event.key);
		if (guessProgress.indexOf(false) < 0) {
			processWin();
			resetGame();
		}
		if (guessesLeft < 1) {
			resetGame();
		}
	}
}

resetGame();