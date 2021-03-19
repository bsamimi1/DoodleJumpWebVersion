export default class Platform {
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
