require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8800;

// Allow CORS for all origins (you can restrict this to your domain if needed)
app.use(cors());

// Endpoint to proxy requests to NewsAPI
app.get("/api/news", async (req, res) => {
  try {
    const { category, page, country, pageSize } = req.query;
    const apiKey = "b61eb376835048cf8ff79d20f1dfd24f"; // Replace with your NewsAPI key

    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
    if (category) {
      url += `&category=${category}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    if (country) {
      url += `&country=${country}`;
    }
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/api/news/search", async (req, res) => {
  try {
    const { query, page, pageSize } = req.query;
    const apiKey = "b61eb376835048cf8ff79d20f1dfd24f"; // Replace with your NewsAPI key

    let url = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;
    if (query) {
      url += `&q=${query}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to search news" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
