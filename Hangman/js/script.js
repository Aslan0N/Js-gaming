const word_el = document.getElementById("word");
const popupCon = document.getElementById("popup-container");
const popupCard = document.getElementById("popup-card");
const message = document.querySelector(".message");
const errLetters = document.getElementById("err-letter");
const wrongLettersInterface = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const correctLetters = [];
const wrongLetters = [];



// Random Words
const randomWord = () => {
  const words = ["java", "python", "html", "mongo", "react", "angular"];

  return words[Math.floor(Math.random() * words.length)];
};

let selectedWord = randomWord();
// Disaplay Letter
const displayLetter = () => {
  word_el.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</div>`
    )
    .join("")}
  `;
  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popupCon.style.display = "flex";
    popupCard.style.backgroundColor = "#128334";
    message.innerText = "Congrulations";
  }
};

// Used letter error
const letterErr = () => {
  errLetters.classList.add("show");

  setTimeout(() => {
    errLetters.classList.remove("show");
  }, 2000);
};

const updateWrongLetters = () => {
  wrongLettersInterface.innerHTML = `
  ${wrongLetters.length > 0 ? "<h3>Wrong Letters</h3>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;


  items.forEach((item,index)=>{
    if(index < wrongLetters.length){
      item.style.display = "block"
    }else{
      item.style.display = "none"
    }
  })

  if(wrongLetters.length === items.length){
    popupCon.style.display = "flex";
    popupCard.style.backgroundColor = "#c31331";
    message.innerText = "Game Over"
  }
};

// KeyDown

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    let letterKey = e.key;
    if (selectedWord.includes(letterKey)) {
      if (!correctLetters.includes(letterKey)) {
        correctLetters.push(letterKey);
        displayLetter();
      } else {
        letterErr();
      }
    } else {
      if (!wrongLetters.includes(letterKey)) {
        wrongLetters.push(letterKey);
        updateWrongLetters();
        displayLetter();
      }else {
        letterErr();
      }
    }
  }
});
displayLetter();


// New Game
const newGame = () => {
  wrongLetters.splice(0);
  correctLetters.splice(0);
  selectedWord = randomWord();

  displayLetter();
  updateWrongLetters();

  popupCon.style.display = "none"
  popupCard.style.backgroundColor = 'none'
};