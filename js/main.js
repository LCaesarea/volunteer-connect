/*
Name: [Ackeem Thomas]
Student ID: [100807236]
Date: [25/02/2025]
*/

// Highlight Active Page in Navbar
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Update login status on page load
    updateLoginStatus();
    displayLoginStatus();

    // Initialize dark mode based on user preference
    initializeDarkMode();

    // Initialize search functionality
    initializeSearch();
});

// Back to Top Button
const backToTopButton = document.createElement("button");
backToTopButton.textContent = "Back to Top";
backToTopButton.id = "backToTopBtn";
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Change "Opportunities" to "Volunteer Now"
const opportunitiesLink = document.querySelector('a[href="opportunities.html"]');
if (opportunitiesLink) {
    opportunitiesLink.textContent = "Volunteer Now";
}

// Opportunities Page: Dynamic Content Generation
if (window.location.pathname.includes("opportunities.html")) {
    const opportunities = [
        {
            title: "Community Cleanup",
            description: "Help clean up local parks and streets.",
            date: "2023-11-15",
            time: "10:00 AM"
        },
        {
            title: "Food Drive",
            description: "Assist in collecting and distributing food to those in need.",
            date: "2023-11-20",
            time: "9:00 AM"
        }
    ];

    const opportunityContainer = document.getElementById("opportunity-container");

    opportunities.forEach(opp => {
        const card = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${opp.title}</h5>
                    <p class="card-text">${opp.description}</p>
                    <p class="card-text"><small class="text-muted">${opp.date} at ${opp.time}</small></p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
                </div>
            </div>
        `;
        opportunityContainer.innerHTML += card;
    });

    // Sign Up Form Submission
    document.getElementById("signupForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        alert(`Thank you, ${name}! We have received your sign-up request. We will contact you at ${email}.`);
        event.target.reset(); // Clear the form
    });
}

// Events Page: Load Events Dynamically Using AJAX
if (window.location.pathname.includes("events.html")) {
    const eventsContainer = document.getElementById("events-container");

    // Fetch events from JSON file
    fetch("data/events.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Clear existing content
            eventsContainer.innerHTML = "";

            // Display each event
            data.forEach(event => {
                const eventCard = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">${event.description}</p>
                            <p class="card-text"><small class="text-muted">${event.date} at ${event.time}</small></p>
                        </div>
                    </div>
                `;
                eventsContainer.innerHTML += eventCard;
            });
        })
        .catch(error => {
            console.error("Error loading events:", error);
            eventsContainer.innerHTML = `<div class="alert alert-danger">Failed to load events. Please try again later.</div>`;
        });

    // Filter events by category
    window.filterEvents = function (category) {
        fetch("data/events.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Clear existing content
                eventsContainer.innerHTML = "";

                // Filter and display events
                data.forEach(event => {
                    if (category === "all" || event.category === category) {
                        const eventCard = `
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${event.title}</h5>
                                    <p class="card-text">${event.description}</p>
                                    <p class="card-text"><small class="text-muted">${event.date} at ${event.time}</small></p>
                                </div>
                            </div>
                        `;
                        eventsContainer.innerHTML += eventCard;
                    }
                });
            })
            .catch(error => {
                console.error("Error filtering events:", error);
                eventsContainer.innerHTML = `<div class="alert alert-danger">Failed to filter events. Please try again later.</div>`;
            });
    };
}

// Contact Us Page: Form Submission
if (window.location.pathname.includes("contact.html")) {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        // Simulate form submission (e.g., send data to a server)
        console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

        alert("Thank you for contacting us! We will get back to you soon.");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000); // Redirect to Home Page after 5 seconds
    });
}

// Login/Logout Functionality
const loginLogoutLink = document.getElementById("login-logout-link");

function updateLoginStatus() {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
        loginLogoutLink.textContent = "Log Out";
        loginLogoutLink.href = "#";
        loginLogoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.setItem("loggedIn", "false");
            alert("You have been logged out.");
            window.location.href = "index.html"; // Redirect to home page after logout
        });
    } else {
        loginLogoutLink.textContent = "Log In";
        loginLogoutLink.href = "login.html";
    }
}

// Handle login form submission
if (window.location.pathname.includes("login.html")) {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Simulate login (replace with actual authentication logic)
            if (username === "user" && password === "password") {
                localStorage.setItem("loggedIn", "true");
                alert("Login successful! Redirecting to the home page.");
                window.location.href = "index.html"; // Redirect to home page after login
            } else {
                alert("Invalid username or password.");
            }
        });
    }
}

// Display login status in the UI
function displayLoginStatus() {
    const loginStatusElement = document.getElementById("login-status");
    if (loginStatusElement) {
        const isLoggedIn = localStorage.getItem("loggedIn") === "true";
        if (isLoggedIn) {
            loginStatusElement.textContent = "Welcome, User!";
        } else {
            loginStatusElement.textContent = "Please log in to access more features.";
        }
    }
}

// Dark Mode Toggle
const darkModeToggle = document.createElement("button");
darkModeToggle.textContent = "🌙"; // Moon emoji for dark mode
darkModeToggle.id = "darkModeToggle";
darkModeToggle.setAttribute("aria-label", "Toggle Dark Mode"); // Accessibility
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode").toString());
    // Update button text based on mode
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Initialize dark mode and button text on page load
function initializeDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️"; // Sun emoji for light mode
    } else {
        darkModeToggle.textContent = "🌙"; // Moon emoji for dark mode
    }
}

// Search Functionality
function initializeSearch() {
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
            const searchQuery = document.getElementById("searchInput").value.toLowerCase();
            const searchResultsContainer = document.getElementById("searchResults");

            // Clear previous results
            searchResultsContainer.innerHTML = "";

            // Fetch data to search (e.g., events, news, etc.)
            const dataToSearch = [
                // Example data (replace with your actual data)
                { type: "event", title: "Community Cleanup", description: "Help clean up local parks.", date: "2023-11-15" },
                { type: "event", title: "Food Drive", description: "Collect and distribute food to those in need.", date: "2023-11-20" },
                { type: "news", title: "Local Park Renovation", description: "The city plans to renovate the central park.", date: "2023-11-10" },
            ];

            // Filter data based on search query
            const filteredResults = dataToSearch.filter(item =>
                item.title.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery)
            );

            // Display search results
            if (filteredResults.length > 0) {
                filteredResults.forEach(result => {
                    const resultCard = `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${result.title}</h5>
                                <p class="card-text">${result.description}</p>
                                <p class="card-text"><small class="text-muted">${result.date}</small></p>
                            </div>
                        </div>
                    `;
                    searchResultsContainer.innerHTML += resultCard;
                });
            } else {
                searchResultsContainer.innerHTML = `<div class="alert alert-warning">No results found for "${searchQuery}".</div>`;
            }
        });
    }
}
