const express = require("express");
const router = require("./routes/router.js");

const app = express();
const port = 5000;

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Welcome to my expressJs task home page");
})

app.use((req, res) => res.status(404).send({
  status: false,
  message: "invalid route"
}));

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
})