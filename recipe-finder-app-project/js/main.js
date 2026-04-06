const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

searchBtn.addEventListener("click", searchRecipes);

function searchRecipes() {
  const query = document.getElementById("searchInput").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      displayRecipes(data.meals);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

function displayRecipes(meals) {
  results.innerHTML = "";

  if (!meals) {
    results.innerHTML = "<p>No recipes found</p>";
    return;
  }

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
    `;

    // CLICK WORKING HERE
    card.addEventListener("click", () => {
      window.location.href = `recipe.html?id=${meal.idMeal}`;
    });

    const favBtn = document.createElement("button");
    favBtn.textContent = "❤️ Save";
    favBtn.classList.add("fav-btn");

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      const alreadySaved = favorites.find(item => item.idMeal === meal.idMeal);

      if (!alreadySaved) {
        favorites.push(meal);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        favBtn.textContent = "✅ Saved";
      }
    });

    card.appendChild(favBtn);

    results.appendChild(card);
  });
}

document.getElementById("viewFavoritesBtn").addEventListener("click", () => {
  window.location.href = "favorites.html";
});

