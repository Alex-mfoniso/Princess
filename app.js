// product js
    function toggleMenu() {
      const links = document.querySelector('.nav-links');
      links.classList.toggle('show');
    }

 
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove 'active' from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      productCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // const filterButtons = document.querySelectorAll(".filter-btn");
  // const productCards = document.querySelectorAll(".product-card");
  const searchInput = document.getElementById("productSearch");

  let activeCategory = "all";

  // Category Filter
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.getAttribute("data-category");
      filterProducts();
    });
  });

  // Search Filter
  searchInput.addEventListener("input", () => {
    filterProducts();
  });

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    productCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const category = card.getAttribute("data-category");

      const matchesSearch = title.includes(searchText);
      const matchesCategory = activeCategory === "all" || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }


  // Lightbox logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

productCards.forEach(card => {
  const img = card.querySelector("img");
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

let currentPage = 1;
const itemsPerPage = 6;
function showPage() {
  const searchText = searchInput.value.toLowerCase();
  let count = 0;
  let visibleCards = [];

  productCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const category = card.getAttribute("data-category");
    const matchesSearch = title.includes(searchText);
    const matchesCategory = activeCategory === "all" || category === activeCategory;

    if (matchesSearch && matchesCategory) {
      visibleCards.push(card);
    } else {
      card.style.display = "none";
    }
  });

  const totalPages = Math.ceil(visibleCards.length / itemsPerPage);

  // Fix if currentPage goes out of range
  if (currentPage > totalPages) currentPage = totalPages || 1;

  // Show only items for the current page
  visibleCards.forEach((card, index) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    card.style.display = index >= start && index < end ? "block" : "none";
  });

  // Update page number display
  document.getElementById("pageNumber").innerText = currentPage;

  // Enable/disable buttons
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages || totalPages === 0;
}


document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  showPage();
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  showPage();
});

// Replace filterProducts() with:
function filterProducts() {
  currentPage = 1;
  showPage();
}

filterProducts(); // Initial call
