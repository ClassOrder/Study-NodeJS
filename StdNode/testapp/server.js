const express = require("express");
const config = require("./server/configure");
const path = require("path");
let app = express();

app.set("port", process.env.PORT || 10808);
app.set("views", path.join(__dirname, "views"));
app = config(app); // 조금 직관적이지 않은 느낌 ..
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });
const server = app.listen(app.get("port"), () => {
    console.log("Server up: http://localhost:"+app.get("port"));
});