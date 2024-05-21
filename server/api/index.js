const express = require("express");
const app = express();
console.log(app);
app.get("/", (req, res) => res.send("Testing"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
