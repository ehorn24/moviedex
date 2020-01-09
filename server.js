const express = require("express");
const morgan = require("morgan");
const movies = require("./moviedex-api");

const app = express();
app.use(morgan("dev"));

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.listen(7000, () => {
  console.log("server started on PORT 7000");
});
