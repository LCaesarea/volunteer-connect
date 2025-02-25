// auth.js
/*
Name: [Ackeem Thomas]
Student ID: [100807236]
Date: [25/02/2025]
*/

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulate login (replace with actual authentication logic)
        if (username === "user" && password === "password") {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password.");
        }
    });
});