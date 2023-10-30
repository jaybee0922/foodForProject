/*-------------------------search food-------------*/
let page = 1;
const resultsPerPage = 4; // Number of results to display per page

document.getElementById("searchButton").addEventListener("click", function () {
  page = 1; // Reset page when a new search is performed
  const foodInput = document.getElementById("foodInput").value;
  searchFood(foodInput, page);
  document.getElementById("loadMoreButton").style.display = "block";
});

document
  .getElementById("loadMoreButton")
  .addEventListener("click", function () {
    const foodInput = document.getElementById("foodInput").value;
    showSpinner(true); // Show the spinner when clicking "Load More"
    setTimeout(() => {
      page++;
      searchFood(foodInput, page);
      showSpinner(false); // Hide the spinner after 1 second
    }, 1000);
  });

function showSpinner(show) {
  const spinner = document.getElementById("spinner");
  if (show) {
    spinner.style.display = "inline-block";
  } else {
    spinner.style.display = "none";
  }
}

function searchFood(query, page) {
  const appId = "a0c3cbeb";
  const appKey = "36cbad88ec06f8c067f394ba755ee69d";
  const resultsDiv = document.getElementById("results");

  if (page === 1) {
    resultsDiv.innerHTML = ""; // Clear previous results only when it's the first page
  }

  // Calculate the from and to parameters for pagination
  const from = (page - 1) * resultsPerPage;
  const to = page * resultsPerPage;

  // Include the 'query', 'from', and 'to' in your API request to search for the specified food and paginate results
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

        // Create a food card to display image, title, and description
        const foodCard = document.createElement("div");
        foodCard.className = "food-card";
        foodCard.classList.add("show"); // Apply the "show" class to trigger the animation

        const imageElement = document.createElement("img");
        imageElement.className = "food-image";
        imageElement.src = foodImage;

        const titleElement = document.createElement("h2");
        titleElement.innerText = foodLabel;

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = foodDescription;

        // Append image, title, and description to the food card
        foodCard.appendChild(imageElement);
        foodCard.appendChild(titleElement);
        foodCard.appendChild(descriptionElement);

        // Append the food card to the results div
        resultsDiv.appendChild(foodCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}
