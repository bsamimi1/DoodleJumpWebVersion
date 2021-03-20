const boundary = document.querySelector(".boundary");
const character = document.createElement("div");

let characterLeftSpace;
let characterBottomSpace;
let isGameOver = false;
const platforms = [];
const numPlatforms = 5;
let upTimerId;
let downTimerId;
let isJumping = true;
let jumpPos;
let isLeft;
let isRight;
let leftTimerId;
let rightTimerId;

function initializeCharacter() {
  character.classList.add("character");
  boundary.appendChild(character);
  characterLeftSpace = platforms[0].left;
  //hardcoded height of platform for now
  characterBottomSpace = platforms[0].bottom + 15;
  jumpPos = characterBottomSpace;
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
  isJumping = true;
  clearInterval(downTimerId);
  upTimerId = setInterval(() => {
    characterBottomSpace += 10;
    character.style.bottom = characterBottomSpace + "px";
    if (characterBottomSpace > jumpPos + 200) {
      charFall();
    }
  }, 30);
}

function charFall() {
  isJumping = false;
  clearInterval(upTimerId);
  downTimerId = setInterval(() => {
    characterBottomSpace -= 5;
    character.style.bottom = characterBottomSpace + "px";
    if (characterBottomSpace <= 0) {
      gameOver();
    }
    platforms.forEach((platform) => {
      if (
        characterBottomSpace >= platform.bottom &&
        characterBottomSpace <= platform.bottom + 15 &&
        characterLeftSpace + 60 >= platform.left &&
        characterLeftSpace <= platform.left + 85
      ) {
        console.log("jumping");
        charJump();
        jumpPos = characterBottomSpace;
      }
    });
  }, 30);
}

function gameOver() {
  console.log("game over");
  isGameOver = true;
  clearInterval(downTimerId);
  clearInterval(upTimerId);
}

createPlatforms();
initializeCharacter();
setInterval(movePlatforms, 30);
charJump();
