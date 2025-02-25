// gallery.js
/*
Name: [Ackeem Thomas]
Student ID: [100807236]
Date: [25/02/2025]
*/

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");

    // Example image data
    const images = [
        { src: "images/event1.jpg", alt: "Event 1" },
        { src: "images/event2.jpg", alt: "Event 2" },
        { src: "images/event3.jpg", alt: "Event 3" }
    ];

    // Dynamically load images
    images.forEach(image => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-3");

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add("img-fluid", "gallery-image");

        col.appendChild(img);
        gallery.appendChild(col);
    });

    // Lightbox functionality
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
        <span id="close">&times;</span>
        <img id="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    document.querySelectorAll(".gallery-image").forEach(image => {
        image.addEventListener("click", () => {
            lightbox.style.display = "flex";
            document.getElementById("lightbox-img").src = image.src;
        });
    });

    document.getElementById("close").addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});