/*--------------------change theme variables--------------*/
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const siderbarClose = document.querySelector(".siderbarClose");

/*---------------local storage for change theme variable-------------*/
let getMode = localStorage.getItem("mode");

/*-------------navlink animation && slideShow variable--------*/
const menu = document.querySelector("#menu");
const slides = document.querySelectorAll(".slideshow .slide-image");
let currentSlide = 0;

/*-------------keep user selected mode even page refresh ----*/
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
  const language = document.querySelector("#language");
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  language.classList.add("language");

  // js code to keep user selected mode even page refresh or file reopen
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

// js code to toggle search box
searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});

//   js code to toggle sidebar
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});
body.addEventListener("click", (e) => {
  let clickedElm = e.target;
  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

/*----------------image slide show--------------*/

const slideShow = () => {
  let len = slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });
  currentSlide = (currentSlide + 1) % len;
};

setInterval(slideShow, 3000);

/*-------------navlink menu animation bouncing--------*/
const animationMenu = () => {
  requestAnimationFrame(() => {
    menu.classList.add("blink");
  });
};

setInterval(animationMenu, 1000);

/*----------------language translate---------------*/
document.addEventListener("DOMContentLoaded", function () {
  translateText(); // Translate on page load
});

// Automatically translate when language is changed
document.getElementById("language").addEventListener("change", function () {
  translateText();
});

async function translateText() {
  const selectedLanguage = document.getElementById("language").value;
  const elementsToTranslate = [
    { id: "home", text: "Home" },
    { id: "menu", text: "Menu" },
    { id: "contact", text: "Contact" },
    { id: "About", text: "About" },
  ];

  for (const element of elementsToTranslate) {
    const elementNode = document.getElementById(element.id);
    if (elementNode) {
      if (selectedLanguage !== "en") {
        const encodedText = encodeURIComponent(element.text);
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${selectedLanguage}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data.responseData && data.responseData.translatedText) {
            elementNode.textContent = data.responseData.translatedText;
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        elementNode.textContent = element.text;
      }
    }
  }
}
