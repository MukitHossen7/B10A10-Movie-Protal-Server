require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection, client } = require("./DB/connectDB");
const { ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
connection();
//Middleware
app.use(express.json());
app.use(cors());
//Middleware

const movieCollection = client.db("movieDB").collection("movie");
const favoriteCollection = client.db("movieDB").collection("favorite");

app.post("/movies", async (req, res) => {
  const movie = req.body;
  const result = await movieCollection.insertOne(movie);
  res.json(result);
});

app.post("/favorite", async (req, res) => {
  const favorite = req.body;
  const result = await favoriteCollection.insertOne(favorite);
  res.json(result);
});

app.get("/favorite", async (req, res) => {
  const email = req.query.userEmail;
  if (email) {
    const favoriteData = await favoriteCollection.find({ email }).toArray();
    return res.send(favoriteData);
  }
  const favoriteData = await favoriteCollection
    .find()
    .sort({ _id: -1 })
    .toArray();
  return res.send(favoriteData);
});
app.get("/favorite/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const favorite = await favoriteCollection.findOne(query);
  res.send(favorite);
});
app.delete("/favorite/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await favoriteCollection.deleteOne(query);
  res.json(result);
});
app.get("/movies", async (req, res) => {
  const movies = await movieCollection.find().sort({ _id: -1 }).toArray();
  res.json(movies);
});

app.get("/movies/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const movie = await movieCollection.findOne(query);
  res.send(movie);
});
app.delete("/movies/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await movieCollection.deleteOne(query);
  res.json(result);
});
app.patch("/movies/:id", async (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  const query = { _id: new ObjectId(id) };

  const updatedMovie = {
    $set: {
      poster: movie.poster,
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      releaseYear: movie.releaseYear,
      rate: movie.rate,
      summary: movie.summary,
    },
  };
  const result = await movieCollection.updateOne(query, updatedMovie);
  res.json(result);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
