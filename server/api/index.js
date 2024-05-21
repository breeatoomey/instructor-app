const express = require("express");
const app = express();
const cors = require("cors");

const data = '{ "name": "Alice", "age": 30, "city": "New York", "skills": ["JavaScript", "Python", "Java"], "isActive": true }';

app.use(cors());
app.get("/", (req, res) => res.send(data));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
