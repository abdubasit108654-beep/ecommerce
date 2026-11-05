
const products = [
    {
        id: 1,
        name: "Premium Headphones",
        category: "Electronics",
        price: 4500,
        image: "/assets/images/h.jpg"
    },
    {
        id: 2,
        name: "Stylish Watch",
        category: "Accessories",
        price: 3200,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Modern Sneakers",
        category: "Fashion",
        price: 5500,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 1800,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 5,
        name: "Smart Camera",
        category: "Electronics",
        price: 12000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        id: 6,
        name: "Home Decoration",
        category: "Home",
        price: 2500,
        image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=500"
    },
    {
        id: 7,
        name: "Travel Bag",
        category: "Accessories",
        price: 3800,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 8,
        name: "Modern Lamp",
        category: "Home",
        price: 2900,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"

    },
    {
        id: 9,
        name: "brecelet",
        category: "jewellary",
        price: 4000,
        image: "/assets/images/bracelet.jpg"
        
    },
    {
        id: 10,
        name: "watch",
        category: "fashion",
        price: 3000,
        image: "/assets/images/brown watch.jpg"
        
    },
    {
        id: 11,
        name: "shawl",
        category: "fashion",
        price: 4000,
        image: "/assets/images/shawl.jpg"
        
    },
    
    {
        id: 12,
        name: "glasses",
        category: "fashion",
        price: 1500,
        image: "/assets/images/glasses.jpg"
        
    },


    {
        id: 13,
        name: "sofa",
        category: "home",
        price: 80000,
        image: "/assets/images/sofa.jpg"
        
     },
      {
        id: 14,
        name: "volit",
        category: "fashion",
        price: 1000,
        image: "/assets/images/volit.avif"
        
     },
     
     {
        id: 15,
        name: "ladies fancy slippers",
        category: "fashion",
        price: 1000,
        image: "/assets/images/slippers.avif"
        
     },
     {
        id: 16,
        name: "clip for girls cartoon clip",
        category: "fashion",
        price: 500,
        image: "/assets/images/cartoon clip.avif"
        
     },
     {
        id: 17,
        name: "lip mask",
        category: "fashion",
        price: 500,
        image: "/assets/images/lip mask.avif"
        
     },
     {
        id: 18,
        name: "camera",
        category: "fashion",
        price: 20000,
        image: "/assets/images/camera.jpg"
        
     }
     
];

let cart = [];
let currentCategory = "All";

// Display Products
function displayProducts(list) {
    const grid = document.getElementById("product-grid");

    if (list.length === 0) {
        grid.innerHTML = "<p>No products found!</p>";
        return;
    }

    grid.innerHTML = list.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}"
                 onerror="this.src='https://placehold.co/400x300?text=Product'">

            <h3>${product.name}</h3>
            <p class="price">Rs. ${product.price.toLocaleString("en-PK")}</p>

            <button class="add-btn" onclick="addToCart(${product.id})">
                Add to Cart +
            </button>
        </div>
    `).join("");
}

// Category Filter
function filterCategory(category) {
    currentCategory = category;
    applyFilters();
}

// Search Products
document.getElementById("search").addEventListener("input", applyFilters);

function applyFilters() {
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(product => {
        const categoryMatch =
            currentCategory === "All" ||
            product.category === currentCategory;

        const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return categoryMatch && searchMatch;
    });

    displayProducts(filtered);
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

// Change Quantity
function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    updateCart();
}

// Remove Product
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <h4>${item.name}</h4>

                    <p>Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}</p>

                    <div class="quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn"
                            onclick="removeItem(${item.id})">✕</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cartCount.innerText = count;
    cartTotal.innerText = total.toLocaleString("en-PK");
}

// Toggle Cart
function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
    document.getElementById("cart-overlay").classList.toggle("active");
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Please add products to your cart first!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const order = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join("\n");

    alert(
        "Order Summary:\n\n" +
        order +
        "\n\nTotal: Rs. " + total.toLocaleString("en-PK") +
        "\n\nThis is a demo checkout. Payment is not connected yet."
    );
}

// Newsletter
function subscribe(event) {
    event.preventDefault();
    alert("Thank you for subscribing!");
    event.target.reset();
}

// Initial Load
displayProducts(products);
updateCart();
