// api.js
/*
Name: [Ackeem Thomas]
Student ID: [100807236]
Date: [25/02/2025]
*/

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "ff3533c370c840c78f12e541c654e2e0";
    const newsContainer = document.getElementById("news-container");

    // Check if the news container exists on the page
    if (newsContainer) {
        // Show loading spinner
        newsContainer.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        // Use a reliable CORS proxy
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`;
        const fullUrl = proxyUrl + encodeURIComponent(apiUrl);

        fetch(fullUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the API response for debugging

                // Clear loading spinner
                newsContainer.innerHTML = "";

                // Check if articles are available
                if (data.status === "ok" && data.articles && data.articles.length > 0) {
                    // Display each article
                    data.articles.forEach(article => {
                        const articleCard = `
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.description || "No description available."}</p>
                                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        `;
                        newsContainer.innerHTML += articleCard;
                    });
                } else {
                    newsContainer.innerHTML = `<div class="alert alert-warning">No news articles found.</div>`;
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                newsContainer.innerHTML = `<div class="alert alert-danger">Failed to load news. Please try again later.</div>`;
            });
    }
});
