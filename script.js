// ====== Mobile Menu Toggle ======
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});

// ====== Language Switching ======
const langSelect = document.getElementById("langSelect");
let translations = {};

if (langSelect) {
  fetch("translations.json")
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      setLanguage(langSelect.value);
    });

  langSelect.addEventListener("change", () => {
    setLanguage(langSelect.value);
  });
}

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });
}

// ====== Weather Widget ======
const weatherInfo = document.getElementById("weatherInfo");
const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your API key
const CITY = "Hyderabad";

if (weatherInfo) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.main) {
        weatherInfo.textContent = `${data.main.temp}°C, ${data.weather[0].description}`;
      } else {
        weatherInfo.textContent = "Weather unavailable";
      }
    })
    .catch(() => {
      weatherInfo.textContent = "Weather unavailable";
    });
}

// ====== Product Search & Filter ======
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    productCards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "block" : "none";
    });
  });
}

// ====== Cart Logic ======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName) {
  cart.push(productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart`);
}

// Attach event listeners to Add-to-Cart buttons
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productName = btn.getAttribute("data-product");
    addToCart(productName);
  });
});
