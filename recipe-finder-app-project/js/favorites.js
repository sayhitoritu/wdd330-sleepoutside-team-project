const container = document.getElementById("favoritesContainer");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
    container.innerHTML = "<p>No favorite recipes saved yet.</p>";
} else {
    favorites.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <button class="remove-btn">Remove</button>
    `;

        card.addEventListener("click", () => {
            window.location.href = `recipe.html?id=${meal.idMeal}`;
        });

        const removeBtn = card.querySelector(".remove-btn");

        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const updatedFavorites = favorites.filter(
                item => item.idMeal !== meal.idMeal
            );

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            location.reload();
        });

        container.appendChild(card);
    });
}