// // Lightbox functionality
// const lightbox = document.getElementById("lightbox");
// const lightboxImg = document.getElementById("lightbox-img");
// const lightboxCaption = document.getElementById("lightbox-caption");
// const closeBtn = document.querySelector(".close");

// document.querySelectorAll(".gallery-item img").forEach((image) => {
//   image.addEventListener("click", () => {
//     lightbox.style.display = "block";
//     lightboxImg.src = image.src;
//     lightboxCaption.innerHTML = image.alt;
//   });
// });

// closeBtn.addEventListener("click", () => {
//   lightbox.style.display = "none";
// });

// lightbox.addEventListener("click", (e) => {
//   if (e.target !== lightboxImg) {
//     lightbox.style.display = "none";
//   }
// });

// // Search functionality
// function filterImages() {
//   const searchQuery = document.getElementById("search").value.toLowerCase();
//   const galleryItems = document.querySelectorAll(".gallery-item");

//   galleryItems.forEach((item) => {
//     const caption = item.querySelector(".caption").textContent.toLowerCase();
//     if (caption.includes(searchQuery)) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

// // Theme Toggling
// const themeToggle = document.getElementById("theme-toggle");
// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
//   if (document.body.classList.contains("dark-mode")) {
//     themeToggle.textContent = "☀️ Light Mode";
//   } else {
//     themeToggle.textContent = "🌙 Dark Mode";
//   }
// });

// // Category Filtering
// const filterButtons = document.querySelectorAll(".filter-btn");
// filterButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // Remove active class from all buttons
//     filterButtons.forEach((btn) => btn.classList.remove("active"));
//     // Add active class to the clicked button
//     button.classList.add("active");
//     // Filter images
//     const category = button.getAttribute("data-category");
//     filterByCategory(category);
//   });
// });

// function filterByCategory(category) {
//   const galleryItems = document.querySelectorAll(".gallery-item");
//   galleryItems.forEach((item) => {
//     const itemCategory = item.getAttribute("data-category");
//     if (category === "all" || itemCategory === category) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

// // Infinite Scrolling and Lazy Loading
// const gallery = document.querySelector(".gallery");
// let page = 1;

// function loadMoreImages() {
//   for (let i = 0; i < 6; i++) {
//     const newItem = document.createElement("div");
//     newItem.classList.add("gallery-item");
//     const categories = ["nature", "city", "animals"];
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     newItem.setAttribute("data-category", category);
//     newItem.innerHTML = `
//       <img src="images/${category}${
//       page * 6 + i + 1
//     }.jpg" alt="${category} Image ${page * 6 + i + 1}" loading="lazy">
//       <div class="caption">${category} Image ${page * 6 + i + 1}</div>
//     `;
//     gallery.appendChild(newItem);
//   }
//   page++;
// }

// window.addEventListener("scroll", () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
//     loadMoreImages();
//   }
// });

// // Initial load of images
// loadMoreImages();

//Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-item img").forEach((image) => {
  image.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = image.alt;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});

// Search functionality
function filterImages() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const caption = item.querySelector(".caption").textContent.toLowerCase();
    if (caption.includes(searchQuery)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Theme Toggling
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

// Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");
    // Filter images
    const category = button.getAttribute("data-category");
    filterByCategory(category);
  });
});

function filterByCategory(category) {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    if (category === "all" || itemCategory === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Infinite Scrolling and Lazy Loading
const gallery = document.querySelector(".gallery");
let page = 1;
let isLoading = false; // To prevent multiple loads

function loadMoreImages() {
  if (isLoading) return; // Prevent multiple simultaneous loads
  isLoading = true;

  // Define categories and image counts
  const categories = ["nature", "city", "animals"];
  const imagesPerLoad = 6; // Number of images to load at a time

  for (let i = 0; i < imagesPerLoad; i++) {
    const newItem = document.createElement("div");
    newItem.classList.add("gallery-item");

    // Randomly assign a category
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Generate image path based on category and page number
    const imageNumber = (page - 1) * imagesPerLoad + i + 1;
    const imagePath = `images/${category}${imageNumber}.jpg`;

    newItem.setAttribute("data-category", category);
    newItem.innerHTML = `
      <img src="${imagePath}" alt="${category} Image ${imageNumber}" loading="lazy">
      <div class="caption">${category} Image ${imageNumber}</div>
    `;
    gallery.appendChild(newItem);
  }
  page++;
  isLoading = false;
}

// Throttle function to limit scroll event calls
function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func();
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add throttled scroll event listener
window.addEventListener(
  "scroll",
  throttle(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMoreImages();
    }
  }, 200)
); // Throttle to 200ms

// Initial load of images
loadMoreImages();
