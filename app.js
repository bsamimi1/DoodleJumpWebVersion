const boundary = document.querySelector(".boundary");
const character = document.querySelector(".character");

let characterLeftSpace = 50;
let characterBottomSpace = 150;
let isGameOver = false;
const numPlatforms = 5;

function setCharacterPosition() {
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
  }
}

setCharacterPosition();
createPlatforms();
