/**
 * Nyamakima TechTrend E-Commerce Website
 * script.js - Main JavaScript functionality
 *
 * Features:
 * - Product loading and display
 * - Shopping cart functionality
 * - Product filtering and sorting
 * - Responsive design interactions
 * - Form handling
 */

// Product data
const products = [
    {
        id: 1,
        name: "UltraBook Pro",
        description: "Thin and light laptop with powerful performance",
        price: 245999.00,
        category: "laptops",
        image: "images/laptop1.jpg"
    },
    {
        id: 2,
        name: "Gaming Beast",
        description: "High-performance gaming laptop with RGB keyboard",
        price: 1499.99,
        category: "laptops",
        image: "images/laptop2.jpg"
    },
    {
        id: 3,
        name: "SmartPhone - Iphone 16",
        description: "Flagship smartphone with amazing camera",
        price: 387799.00,
        category: "phones",
        image: "images/phone1.jpg"
    },
    {
        id: 4,
        name: "Budget Phone",
        description: "Affordable smartphone with great features",
        price: 52999.99,
        category: "phones",
        image: "images/phone2.jpg"
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        description: "Noise cancelling wireless earbuds",
        price: 2149.00,
        category: "accessories",
        image: "images/earbuds.jpg"
    },
    {
        id: 6,
        name: "Smart Watch",
        description: "Fitness tracker and smart notifications",
        price: 4199.99,
        category: "accessories",
        image: "images/watch.jpg"
    },
    {
        id: 7,
        name: "4K Monitor",
        description: "27-inch 4K display with HDR",
        price: 38399.99,
        category: "accessories",
        image: "images/monitor.jpg"
    },
    {
        id: 8,
        name: "Ergonomic Keyboard",
        description: "Comfortable typing experience",
        price: 1299.99,
        category: "accessories",
        image: "images/keyboard.jpg"
    }
];

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');
const cartCount = document.getElementById('cart-count');

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

/**
 * Format price with commas and KShs. prefix
 * @param {number} price - Price to format
 * @returns {string} Formatted price
 */
function formatPrice(price) {
    return `KShs. ${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

/**
 * Initialize the application
 */
function initApp() {
    console.log('Initializing application...');

    // Setup mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Setup newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Update cart count
    updateCartCount();

    // Load appropriate content based on current page
    loadPageContent();

    console.log('Application initialized successfully');
}

/**
 * Load content based on current page
 */
function loadPageContent() {
    const currentPath = window.location.pathname;
    const path = currentPath.split('/').pop() || 'index.html';
    console.log(`Loading content for page: ${path}`);

    switch(path) {
        case 'index.html':
        case '':
            loadFeaturedProducts();
            break;
        case 'products.html':
            loadAllProducts();
            setupProductFilters();
            break;
        case 'cart.html':
            loadCartItems();
            setupCartInteractions();
            break;
        default:
            console.log('Unknown page path:', path);
            // If we can't determine the page, try loading featured products as a fallback
            const featuredContainer = document.getElementById('featured-products');
            if (featuredContainer) {
                loadFeaturedProducts();
            }
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');

    if (mainNav.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        console.log('Mobile menu opened');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        console.log('Mobile menu closed');
    }
}

/**
 * Handle newsletter form submission
 * @param {Event} e - Form submission event
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    console.log('Newsletter form submitted');

    const emailInput = e.target.querySelector('input');
    const email = emailInput.value.trim();

    if (!email) {
        showFeedback('Please enter a valid email address', 'error');
        return;
    }

    // Simulate API call
    setTimeout(() => {
        showFeedback('Thank you for subscribing!', 'success');
        e.target.reset();
    }, 1000);
}

/**
 * Show feedback message
 * @param {string} message - Feedback message
 * @param {string} type - Type of feedback (success/error)
 */
function showFeedback(message, type) {
    if (!newsletterFeedback) return;

    newsletterFeedback.textContent = message;
    newsletterFeedback.className = `${type}-message`;

    // Clear message after 3 seconds
    setTimeout(() => {
        newsletterFeedback.textContent = '';
        newsletterFeedback.className = '';
    }, 3000);
}

/**
 * Load featured products on homepage
 */
function loadFeaturedProducts() {
    console.log('Loading featured products...');
    const featuredContainer = document.getElementById('featured-products');

    if (!featuredContainer) {
        console.error('Featured products container not found');
        return;
    }

    try {
        // Get 4 random featured products
        const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
        const fallbackImage = 'https://via.placeholder.com/300x200?text=Product+Image';

        featuredContainer.innerHTML = featuredProducts.map(product => {
            const imageSrc = product.image || fallbackImage;
            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${imageSrc}" alt="${product.name}"
                             onerror="this.src='${fallbackImage}'">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">
                            <span class="price">${formatPrice(product.price)}</span>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

        console.log(`Loaded ${featuredProducts.length} featured products`);
    } catch (error) {
        console.error('Error loading featured products:', error);
        featuredContainer.innerHTML = '<p class="error-message">Unable to load products. Please try again later.</p>';
    }
}

/**
 * Load all products on products page
 * @param {Array} productsToShow - Products to display (defaults to all products)
 */
function loadAllProducts(productsToShow = products) {
    console.log('Loading all products...');
    const productsContainer = document.getElementById('products-grid');

    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }

    try {
        const fallbackImage = 'https://via.placeholder.com/300x200?text=Product+Image';

        if (productsToShow.length === 0) {
            productsContainer.innerHTML = '<p class="empty-message">No products match your filters.</p>';
            return;
        }

        productsContainer.innerHTML = productsToShow.map(product => {
            const imageSrc = product.image || fallbackImage;
            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${imageSrc}" alt="${product.name}"
                             onerror="this.src='${fallbackImage}'">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">
                            <span class="price">${formatPrice(product.price)}</span>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

        console.log(`Loaded ${productsToShow.length} products`);
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<p class="error-message">Unable to load products. Please try again later.</p>';
    }
}

/**
 * Setup product filters
 */
function setupProductFilters() {
    console.log('Setting up product filters...');
    const categoryFilter = document.getElementById('category');
    const sortFilter = document.getElementById('sort');

    if (categoryFilter && sortFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        sortFilter.addEventListener('change', filterProducts);
        console.log('Product filters initialized');
    }
}

/**
 * Filter and sort products
 */
function filterProducts() {
    console.log('Filtering products...');
    const category = document.getElementById('category').value;
    const sort = document.getElementById('sort').value;

    let filteredProducts = [...products];

    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
        console.log(`Filtered by category: ${category}, ${filteredProducts.length} products remaining`);
    }

    // Sort products
    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
        console.log('Sorted by price: low to high');
    } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
        console.log('Sorted by price: high to low');
    }

    // Reload products with filters applied
    loadAllProducts(filteredProducts);
}

/**
 * Add product to cart
 * @param {Event} e - Click event
 */
function addToCart(e) {
    const productId = parseInt(e.target.closest('.product-card').dataset.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    console.log(`Adding product to cart: ${product.name}`);

    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        console.log(`Increased quantity for ${product.name} to ${existingItem.quantity}`);
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        console.log(`Added new item to cart: ${product.name}`);
    }

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show feedback
    showCartFeedback('Added to cart!');
}

/**
 * Show cart feedback message
 * @param {string} message - Feedback message
 */
function showCartFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Remove feedback after animation
    setTimeout(() => {
        feedback.classList.add('fade-out');
        setTimeout(() => feedback.remove(), 500);
    }, 2000);
}

/**
 * Update cart count in header
 */
function updateCartCount() {
    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    console.log(`Cart updated: ${totalItems} items`);
}

/**
 * Load cart items on cart page
 */
function loadCartItems() {
    console.log('Loading cart items...');
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!cartItemsContainer) {
        console.error('Cart items container not found');
        return;
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        subtotalElement.textContent = 'KShs. 0.00';
        taxElement.textContent = 'KShs. 0.00';
        totalElement.textContent = 'KShs. 1,200.00';
        checkoutBtn.disabled = true;
        console.log('Cart is empty');
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.16; // 16% VAT tax
    const shipping = 1200.00;
    const total = subtotal + shipping + tax;

    // Update totals display
    subtotalElement.textContent = formatPrice(subtotal);
    taxElement.textContent = formatPrice(tax);
    totalElement.textContent = formatPrice(total);

    // Enable checkout button
    checkoutBtn.disabled = false;

    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}"
                     onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-qty">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-qty">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                </button>
                <p class="cart-item-total">${formatPrice(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');

    console.log(`Loaded ${cart.length} cart items`);
}

/**
 * Setup cart interactions (quantity changes, remove items)
 */
function setupCartInteractions() {
    console.log('Setting up cart interactions...');

    // Quantity decrease buttons
    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    // Quantity increase buttons
    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    // Remove item buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    console.log('Cart interactions initialized');
}

/**
 * Decrease item quantity
 * @param {Event} e - Click event
 */
function decreaseQuantity(e) {
    const productId = parseInt(e.target.closest('.cart-item').dataset.id);
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
        console.log(`Decreased quantity for ${item.name} to ${item.quantity}`);
    } else {
        // Remove item if quantity would go to 0
        cart = cart.filter(item => item.id !== productId);
        console.log(`Removed ${item.name} from cart`);
    }

    // Update cart and reload
    updateCart();
}

/**
 * Increase item quantity
 * @param {Event} e - Click event
 */
function increaseQuantity(e) {
    const productId = parseInt(e.target.closest('.cart-item').dataset.id);
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += 1;
    console.log(`Increased quantity for ${item.name} to ${item.quantity}`);

    // Update cart and reload
    updateCart();
}

/**
 * Remove item from cart
 * @param {Event} e - Click event
 */
function removeItem(e) {
    const productId = parseInt(e.target.closest('.cart-item').dataset.id);
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    cart = cart.filter(item => item.id !== productId);
    console.log(`Removed ${item.name} from cart`);

    // Update cart and reload
    updateCart();
}

/**
 * Update cart state and reload display
 */
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
    setupCartInteractions();
}

/**
 * Handle checkout process
 */
function checkout() {
    console.log('Initiating checkout...');

    // In a real app, this would redirect to a checkout page or process payment
    alert('Thank you for your purchase! Your order has been placed.');

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();

    console.log('Checkout completed, cart cleared');
}

// Added some CSS for the cart feedback via JavaScript as the functionality is on JS not on HTML
const style = document.createElement('style');
style.textContent = `
    .cart-feedback {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.5s forwards;
    }

    .cart-feedback.fade-out {
        animation: fadeOut 0.5s forwards;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);