require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection, client } = require("./DB/connectDB");
const app = express();
const port = process.env.PORT || 5000;
connection();
//Middleware
app.use(express.json());
app.use(cors());
//Middleware

const movieCollection = client.db("movieDB").collection("movie");

app.post("/movies", async (req, res) => {
  const movie = req.body;
  const result = await movieCollection.insertOne(movie);
  res.json(result);
});
app.get("/movies", async (req, res) => {
  const movies = await movieCollection.find().sort({ _id: -1 }).toArray();
  res.json(movies);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
