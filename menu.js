const credentials = {
  appId: "a0c3cbeb",
  appKey: "36cbad88ec06f8c067f394ba755ee69d",
};

let page = 1;

const showSpinner = (show) => {
  const spinner = document.querySelector("#spinner");
  if (show) spinner.style.display = "inline-block";
  else {
    spinner.style.display = "none";
  }
};

const searchFood = async (query, page) => {
  const myFirst = credentials.appId;
  const mySecond = credentials.appKey;

  const resultsDiv = document.querySelector("#results");
  const resultsPerPage = 4;

  if (page === 1) {
    resultsDiv.innerHTML = "";
  }

  const from = (page - 1) * resultsPerPage;
  const to = page * resultsPerPage;

  history.pushState({}, "", `?q=${query}&page=${page}`);
  const url = `https://api.edamam.com/search?q=${query}&app_id=${myFirst}&app_key=${mySecond}&from=${from}&to=${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const hits = data.hits;

    hits.forEach((hit) => {
      const { recipe } = hit;
      const { image, label, source } = recipe;

      const foodCard = document.createElement("div");
      foodCard.className = "food-card";
      foodCard.classList.add("show");

      const imageElement = document.createElement("img");
      imageElement.className = "food-image";
      imageElement.src = image;

      const titleElement = document.createElement("h5");
      titleElement.innerText = label;

      const descriptionElement = document.createElement("h6");
      descriptionElement.innerText = source;

      foodCard.appendChild(imageElement);
      foodCard.appendChild(titleElement);
      foodCard.appendChild(descriptionElement);

      resultsDiv.appendChild(foodCard);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const searchButton = () => {
  document
    .querySelector("#searchButton")
    .addEventListener("click", function () {
      page = 1;
      const foodInput = document.querySelector("#foodInput").value;
      searchFood(foodInput, page);
      document.querySelector("#loadMoreButton").style.display = "block";
    });
};

const loadMoreButton = () => {
  document
    .querySelector("#loadMoreButton")
    .addEventListener("click", function () {
      const foodInput = document.querySelector("#foodInput").value;
      showSpinner(true); // Show the spinner when clicking "Load More"
      setTimeout(() => {
        page++;
        searchFood(foodInput, page);
        showSpinner(false); // Hide the spinner after 1 second
      }, 1000);
    });
};

/*---------------invoke function-------------*/
searchButton();
loadMoreButton();
