require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/product", async (req, res) => {
    try {
        const { productName } = req.query;
        if (!productName) {
            return res.status(400).json({ message: "Product name is required" });
        }

        const products = await Product.find({ 
            name: { $regex: productName, $options: "i" } 
        });

        if (!products.length) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

app.get("/", (req, res) => {
    res.send("🚀 Smart Compare Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
