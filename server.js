require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const MOVIES = require("./moviedex-api");

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  console.log(apiToken);
  const authToken = req.get("Authorization");
  console.log(authToken);
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

app.get("/movie", function getMovie(req, res) {
  let response = MOVIES;
  const { genre, country, avg_vote } = req.query;
  if (genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }
  if (country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }
  if (avg_vote) {
    response = response.filter(
      movie => Number(movie.avg_vote) >= Number(avg_vote)
    );
  }
  res.json(response);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
