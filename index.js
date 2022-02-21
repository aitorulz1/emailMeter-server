const express = require("express");
const conectarDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

conectarDB();

app.use(cors())
app.use(bodyParser.json());
app.use(express.json({ extends: true }));
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});

app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/workout", require("./routes/workout"));


   