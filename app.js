const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");
let getMode = localStorage.getItem("mode");

if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");

  // Target the specified footer element with id "main-footer"
  const mainFooter = document.querySelector("#main-footer");
  if (mainFooter) {
    mainFooter.style.backgroundColor = "#333"; // Change background color to dark gray
  }
}

// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
    // Change the footer background color for light mode
    const mainFooter = document.querySelector("#main-footer");

    if (mainFooter) {
      mainFooter.style.backgroundColor = "#fff"; // Change background color to white
    }
  } else {
    localStorage.setItem("mode", "dark-mode");
    // Change the footer background color for dark mode
    const mainFooter = document.querySelector("#main-footer");
    if (mainFooter) {
      mainFooter.style.backgroundColor = "#333"; // Change background color to dark gray
    }
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
const menu = document.querySelector("#menu");

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
        const foodInput = document.querySelector("#foodInput").value;
        searchFood(foodInput, page);
        loadMoreButton.style.display = "block";
      });
    } else {
      throw new Error("Element with ID 'searchButton' not found.");
    }

    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", function () {
        const foodInput = document.querySelector("#foodInput").value;
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
  const spinner = document.querySelector("#spinner");
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
