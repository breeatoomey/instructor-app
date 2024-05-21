const express = require("express");
const cors = require("cors");
const app = express();

const data = '{ "name": "Alice", "age": 30, "email": "alice@gmail.com", "city": "New York", "skills": ["JavaScript", "Python", "Java"], "isActive": true }';

app.use(cors());

app.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', `true`)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(data)
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
