const path = require("path");
const routes = require("./routes");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");

module.exports = app => {
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({"extended":true}));
    app.use(bodyParser.json());
    app.use(bodyParser({
        uploadDir:path.join(__dirname,"public/upload/temp")
    }));
    app.use(methodOverride());
    app.use(cookieParser("values-in-here"));
    routes(app);
    app.use("/public/", express.static(path.join(__dirname,"../public")));
    if("development" === app.get("env")) {
        app.use(errorHandler());
    }
    return app;
};