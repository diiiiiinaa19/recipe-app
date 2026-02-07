const apiBase = "https://recipe-app-9ml5.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// LOAD PROFILE
async function loadProfile() {
  const res = await fetch(`${apiBase}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  document.getElementById("username").value = data.data.username;
  document.getElementById("email").value = data.data.email;
  document.getElementById("bio").value = data.data.bio || "";
}

loadProfile();

// UPDATE PROFILE
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    bio: document.getElementById("bio").value
  };

  const res = await fetch(`${apiBase}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  if (res.ok) {
    alert("Profile updated!");
  } else {
    alert("Error updating profile");
  }
});
