/*---------------------toggle dark and light mode-------------------*/
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const siderbarClose = document.querySelector(".siderbarClose");

/*---------------testimonial variables--------*/
const testimonials = document.querySelector(".section-testimonials");
const review = document.querySelector(".review");

let getMode = localStorage.getItem("mode");

/*---------------change theme addEventListener---------*/
if (getMode && getMode === "dark-mode") {
  document.body.classList.add("dark");

  // Target the section with id "section-testimonials"
  const testimonials = document.getElementById("section-testimonials");
  if (testimonials) {
    testimonials.classList.add("dark");

    // Target the review items within the section
    const reviewItems = testimonials.querySelectorAll(".reviewItem");
    reviewItems.forEach((item) => {
      item.classList.add("dark");
    });
  }
}

/*------------change theme local storage--------------*/
modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});

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

/*---------------testimonials---------------*/
/*------------------ to be updated tomorrow------------*/
const dateElement1 = document.querySelector("#date1");
const dateElement2 = document.querySelector("#date2");
const dateElement3 = document.querySelector("#date3");

const animationCalender = () => {
  try {
    dateElement1.classList.add("blink");
    dateElement2.classList.add("blink");
    dateElement3.classList.add("blink");
  } catch (error) {
    console.error("One or more date elements are not found in the DOM.");
  }
};

setInterval(animationCalender, 2000);

/*-------------navlink menu animation bouncing--------*/
const menu = document.getElementById("menu");

const animationMenu = () => {
  menu.classList.add("blink");
  setTimeout(() => {
    menu.classList.remove("blink");
  }, 500);
};

setInterval(animationMenu, 1000);

/*-------------------------------searching using lode more button------------------*/
let page = 1;
const resultsPerPage = 4; // set to be display

document.addEventListener("DOMContentLoaded", function () {
  try {
    const searchButton = document.querySelector("#searchButton");
    const loadMoreButton = document.querySelector("#loadMoreButton");

    if (searchButton) {
      searchButton.addEventListener("click", function () {
        page = 1; // Reset page
        const foodInput = document.getElementById("foodInput").value;
        searchFood(foodInput, page);
        loadMoreButton.style.display = "block";
      });
    } else {
      throw new Error("Element with ID 'searchButton' not found.");
    }

    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", function () {
        const foodInput = document.getElementById("foodInput").value;
        showSpinner(true); // Show the spinner when clicking "Load More"
        setTimeout(function () {
          page++;
          searchFood(foodInput, page);
          showSpinner(false); // Hide the spinner after 1 seconds
        }, 1000);
      });
    } else {
      throw new Error("Element with ID 'loadMoreButton' not found.");
    }
  } catch (error) {
    console.error(error.message);
  }
});

/*-----------spinner------------*/
const showSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  if (show) {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
};

/*------------------searching food-------------*/
/*------------------ to be updated tomorrow------------*/

const searchFood = (query, page) => {
  const appId = "";
  const appKey = "";
  const resultsDiv = document.getElementById("results");

  if (page === 1) {
    resultsDiv.innerHTML = ""; // Clear previous results only when it's the first page
  }

  // Calculate the from and to parameters for pagination
  const from = (page - 1) * resultsPerPage;
  const to = page * resultsPerPage;

  // Fetch the food items
  fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`
  )
    .then((response) => response.json())
    .then((data) => {
      const hits = data.hits;

      hits.forEach((hit) => {
        const foodItem = hit.recipe;
        const foodImage = foodItem.image;
        const foodLabel = foodItem.label;
        const foodDescription = foodItem.source;
        const foodRecipeURL = foodItem.url;

        const foodCard = document.createElement("div");
        foodCard.className = "food-card";
        foodCard.classList.add("show");

        const imageElement = document.createElement("img");
        imageElement.className = "food-image";
        imageElement.src = foodImage;

        const titleElement = document.createElement("h2");
        titleElement.innerText = foodLabel;

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = foodDescription;

        foodCard.appendChild(imageElement);
        foodCard.appendChild(titleElement);
        foodCard.appendChild(descriptionElement);

        resultsDiv.appendChild(foodCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
};
