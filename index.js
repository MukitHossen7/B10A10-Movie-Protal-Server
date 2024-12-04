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

// 4W4dihvqMlSIA7Bc
// movieAdmin

app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
