const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const router = require("./router");
const port = 3000;

app.use(methodOverride("_method"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(router);

app.listen(port, () => {
  console.log(`Server listening to http://localhost:${port}`);
});
