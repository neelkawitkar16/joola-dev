const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for products and cart
let products = [
    { id: 1, name: "Table Tennis Racket", price: 50, category: "Table Tennis" },
    { id: 2, name: "Table Tennis Balls (Pack of 6)", price: 10, category: "Table Tennis" },
    { id: 3, name: "Table Tennis Table", price: 400, category: "Table Tennis" },
    { id: 4, name: "Pickleball Paddle", price: 60, category: "Pickleball" },
    { id: 5, name: "Pickleball Balls (Pack of 3)", price: 15, category: "Pickleball" },
    { id: 6, name: "Pickleball Net", price: 200, category: "Pickleball" },
    { id: 7, name: "Sports Water Bottle", price: 20, category: "Accessories" },
    { id: 8, name: "Gym Bag", price: 40, category: "Accessories" },
    { id: 9, name: "Sweatband Set", price: 15, category: "Accessories" }
];

let cart = [];

// GET /products - Returns a list of products
app.get('/products', (req, res) => {
    res.json(products);
});

// POST /cart - Adds a product to the cart
app.post('/cart', (req, res) => {
    const { productId, quantity } = req.body;

    // Validate productId
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Validate quantity
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    // Check if the product already exists in the cart
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        // Update the quantity
        cartItem.quantity += quantity;
    } else {
        // Add new item to the cart
        cart.push({ productId, quantity });
    }

    res.json({ message: "Product added to cart", cart });
});

// GET /cart - Returns the current state of the shopping cart
app.get('/cart', (req, res) => {
    // Map cart items to include product details
    const detailedCart = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...item,
            productName: product.name,
            price: product.price,
            total: product.price * item.quantity
        };
    });

    res.json(detailedCart);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
