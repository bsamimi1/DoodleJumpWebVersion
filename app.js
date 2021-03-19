const boundary = document.querySelector(".boundary");
const character = document.createElement("div");

let characterLeftSpace = 50;
let characterBottomSpace = 250;
let isGameOver = false;
const platforms = [];
const numPlatforms = 5;
let upTimerId;
let downTimerId;

function initializeCharacter() {
  character.classList.add("character");
  boundary.appendChild(character);
  character.style.left = characterLeftSpace + "px";
  character.style.bottom = characterBottomSpace + "px";
}

class Platform {
  constructor(newPlatformBottom) {
    this.bottom = newPlatformBottom;
    this.left = Math.random() * 315;
    this.platDiv = document.createElement("div");

    const platDiv = this.platDiv;
    platDiv.classList.add("platform");
    platDiv.style.left = this.left + "px";
    platDiv.style.bottom = this.bottom + "px";
    console.log(boundary);

    boundary.appendChild(platDiv);
  }
}

function createPlatforms() {
  for (let i = 0; i < numPlatforms; i++) {
    let platformSpaceBetween = 600 / numPlatforms;
    let newPlatBottom = 100 + i * platformSpaceBetween;
    let newPlatform = new Platform(newPlatBottom);
    platforms.push(newPlatform);
  }
}

function movePlatforms() {
  if (characterBottomSpace > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 5;
      let platDiv = platform.platDiv;
      platDiv.style.bottom = platform.bottom + "px";
    });
  }
}

function charJump() {
  clearInterval(downTimerId);
  upTimerId = setInterval(() => {
    characterBottomSpace += 10;
    character.style.bottom = characterBottomSpace + "px";
    if (characterBottomSpace > 350) {
      charFall();
    }
  }, 30);
}

function charFall() {
  clearInterval(upTimerId);
  downTimerId = setInterval(() => {
    characterBottomSpace -= 5;
    character.style.bottom = characterBottomSpace + "px";
    if (characterBottomSpace <= 0) {
      gameOver();
    }
  }, 30);
}

function gameOver() {
  console.log("game over");
}

initializeCharacter();
createPlatforms();
setInterval(movePlatforms, 30);
charJump();
