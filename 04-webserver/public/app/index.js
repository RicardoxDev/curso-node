const $lightModeBtn = document.querySelector(".btn-light img");
const cardImg = document.querySelectorAll(".card img");
const cardProject = document.querySelectorAll(".project-card")
const githubSvg = document.getElementById("svg-github");
const mdsvg = document.getElementById("svg-markdown");

const darkMode = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.style.setProperty("--bg-color", "#20252C");
  document.documentElement.style.setProperty("--font-color", "#fff");
  $lightModeBtn.src = "img/svg-icons/lightbulb-regular.svg";
  cardImg.forEach( (e) => {
    e.style = "box-shadow: none;"
  })
  cardProject.forEach( (e) => {
    e.style = "background: rgba(255 255 255 / .2);"
  })
  githubSvg.style.fill = "#fff";
  mdsvg.style.fill = "#fff";
};

const lightMode = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.style.setProperty("--bg-color", "#fff");
  document.documentElement.style.setProperty("--font-color", "#000");
  $lightModeBtn.src = "img/svg-icons/lightbulb-solid.svg";
  cardImg.forEach( (e) => {
    e.style = "box-shadow: #a1a1a1 1px 1px 20px 1px;"
  })
  cardProject.forEach( (e) => {
    e.style = "background: rgba(0 0 0 / .05);"
  })
  githubSvg.style.fill = "#171515";
  mdsvg.style.fill = "#000";
};

document.addEventListener("click", (e) => {
  if (e.target === $lightModeBtn) {
    if (e.target.src.includes("lightbulb-solid.svg")) {
      darkMode();
    } else {
      lightMode();
    }
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("theme") === null)
    localStorage.setItem("theme", "dark");
  if (localStorage.getItem("theme") === "dark") darkMode();
  if (localStorage.getItem("theme") === "light") lightMode();
});
