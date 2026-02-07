const apiBase = "https://your-app.onrender.com/api"; // URL Render после деплоя

async function fetchRecipes() {
  try {
    const res = await fetch(`${apiBase}/recipes`);
    const data = await res.json();

    const container = document.getElementById("recipes");
    container.innerHTML = "";

    if (data.count === 0) {
      container.innerHTML = "<p>No recipes yet.</p>";
      return;
    }

    data.data.forEach(recipe => {
      const div = document.createElement("div");
      div.className = "recipe-card";
      div.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>By:</strong> ${recipe.author.username}</p>
        <a href="recipe.html?id=${recipe._id}">View Recipe</a>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

fetchRecipes();
