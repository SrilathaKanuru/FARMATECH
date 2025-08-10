function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// Example cart system for Market page
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product} added to cart!`);
}

function filterProducts() {
    let search = document.getElementById('search').value.toLowerCase();
    let products = document.querySelectorAll('.product-card');
    products.forEach(p => {
        let name = p.querySelector('h3').textContent.toLowerCase();
        p.style.display = name.includes(search) ? 'block' : 'none';
    });
}
