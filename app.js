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
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
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
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
  currentSlide = (currentSlide + 1) % slides.length;
};

setInterval(slideShow, 3000); // Change slide every 3 seconds

/*-------------navlink menu animation bouncing--------*/
const animationMenu = () => {
  setTimeout(() => {
    menu.classList.add("blink");
  });
};

setInterval(animationMenu, 1000);

/*----------------language translate---------------*/
// document.addEventListener("DOMContentLoaded", function () {
//   translateText(); // Translate on page load
// });

// // Automatically translate when language is changed
// document.getElementById("language").addEventListener("change", function () {
//   translateText();
// });

// function translateText() {
//   const selectedLanguage = document.getElementById("language").value;

//   // Array of elements to translate
//   const elementsToTranslate = [
//     { id: "home", text: "Home" },
//     { id: "menu", text: "Menu" },
//     { id: "about", text: "About Us" },
//     { id: "contact", text: "Contact Us" },
//     { id: "kusina-pinas", text: "Kusina La Pinas" },
//     {
//       id: "lead",
//       text: " We are a team of highly skilled developers who are passionate about creating innovative solutions. Our expertise spans a wide range of programming languages and technologies, allowing us to tackle complex projects with confidence and precision. With years of experience under our belts, we have honed our abilities to deliver high-quality software, websites, and applications that not only meet but exceed our clients' expectations.",
//     },
//     {
//       id: "pageContent",
//       text: "Welcome to our website. Feel free to explore and learn more about us.",
//     },
//   ];

//   elementsToTranslate.forEach((element) => {
//     const elementNode = document.getElementById(element.id);
//     if (elementNode) {
//       // Check if the selected language is different from the current language
//       if (selectedLanguage !== "en") {
//         // Replace spaces with '%20' for URL encoding
//         const encodedText = encodeURIComponent(element.text);

//         // Construct the API URL with target language code
//         const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${selectedLanguage}`;

//         fetch(apiUrl)
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.responseData && data.responseData.translatedText) {
//               elementNode.textContent = data.responseData.translatedText;
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//           });
//       } else {
//         // If the selected language is English, no need to make a translation request
//         elementNode.textContent = element.text;
//       }
//     }
//   });
// }
