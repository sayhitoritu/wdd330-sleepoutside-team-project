const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      displayRecipes(data.meals);
    });
});

function displayRecipes(meals) {
  results.innerHTML = "";

  meals.forEach(meal => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${meal.strMealThumb}" width="150">
      <h3>${meal.strMeal}</h3>
    `;

    results.appendChild(div);
  });
}