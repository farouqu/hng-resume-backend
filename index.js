const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
let db

const createDatabase = () => {
  db = new sqlite3.Database('./db/messages.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the messages database.');
  });
  db.run('CREATE TABLE IF NOT EXISTS message(name text,email text,message text)');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => res.send("Hello World"));

app.post("/submit-form", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  db.run(`INSERT INTO message(name,email,message) VALUES(?,?,?)`, [name,email,message], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  res.status(200).send({ result: "Mail successfully received" });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  createDatabase();
  console.log(`Server listening at ${port}`);
});