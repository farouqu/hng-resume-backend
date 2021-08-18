const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => res.send("Hello World"));
app.post("/submit-form", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  res.status(200).send({result: "Mail successfully received"});

});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening at ${port}`));