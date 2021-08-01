const express = require("express");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");

const app = express();

app.use(express.json());
app.use(require("./routes/index"));

app.engine(".hbs", hbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

mongoose
  .connect(
    "mongodb+srv://into:code@cluster0.ophke.mongodb.net/db-news?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(3000);
    console.log("Good");
  })
  .catch(() => {
    console.log("Bad");
  });
