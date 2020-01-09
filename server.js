require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const movies = require("./moviedex-api");

console.log(process.env.API_TOKEN);

const app = express();
app.use(morgan("dev"));

app.get("/movie", (req, res) => {
  console.log("hello");
  const { genre = "", country = "", avg_vote = "" } = req.query;
  let results1 = movies.filter(movie =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  );
});

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
