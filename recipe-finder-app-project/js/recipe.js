const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

const recipeDetail = document.getElementById("recipeDetail");

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        let ingredients = "";

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients += `<li>${measure} ${ingredient}</li>`;
            }
        }

        recipeDetail.innerHTML = `
      <div class="recipe-page">
        <h2>${meal.strMeal}</h2>

        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">

        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>

        <h3>Ingredients</h3>
        <ul class="ingredients-list">
          ${ingredients}
        </ul>

        <h3>Instructions</h3>
        <p class="instructions">${meal.strInstructions}</p>

        <button id="backBtn">← Back to Search</button>
      </div>
    `;

        document.getElementById("backBtn").addEventListener("click", () => {
            window.location.href = "index.html";
        });
    })
    .catch(error => {
        recipeDetail.innerHTML = "<p>Unable to load recipe details.</p>";
        recipeDetail.innerHTML = `
  <div class="recipe-page">
    <h2>${meal.strMeal}</h2>

    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">

    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>

    <h3>Ingredients</h3>
    <ul class="ingredients-list">
      ${ingredients}
    </ul>

    <h3>Instructions</h3>
    <p class="instructions">${meal.strInstructions}</p>

    <div class="buttons">
      <button id="favoriteBtn">⭐ Add to Favorites</button>
      <button id="backBtn">← Back to Search</button>
    </div>
  </div>
`;
    });

document.getElementById("favoriteBtn").addEventListener("click", () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadySaved = favorites.find(item => item.idMeal === meal.idMeal);

    if (!alreadySaved) {
        favorites.push({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb
        });

        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Recipe added to favorites!");
    } else {
        alert("Recipe is already in favorites.");
    }
});