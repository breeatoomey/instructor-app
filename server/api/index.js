const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Backend Deployed"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;