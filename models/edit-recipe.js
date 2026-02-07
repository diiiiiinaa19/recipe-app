const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

document
  .getElementById("editRecipeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      cookingTime: document.getElementById("cookingTime").value,
      servings: document.getElementById("servings").value
    };

    const res = await fetch(
      `https://recipe-app-9ml5.onrender.com/api${recipeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );

    if (res.ok) {
      alert("Recipe updated!");
      window.location.href = "index.html";
    } else {
      alert("Error updating recipe");
    }
  });
