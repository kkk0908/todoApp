const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const middleware = require("./utils/middleware");
const bodyParser = require("body-parser");
const path = require("path")
const cors = require('cors')
const { celebrate, Joi, errors, Segments } = require('celebrate');

mongoose
    .connect(`mongodb://localhost:27017/todo`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        const app = express()
        app.use(cors())
        app.use(middleware.formidable, bodyParser.json(), bodyParser.urlencoded({ extended: true }));
        app.use("/static/", express.static(path.join(__dirname, "public")));
        app.use("/signup", routes.signUp)
        app.use("/login", routes.login)
        // app.use("/user/", routes.user)
        app.use(middleware.auth)
        app.use("/task/", routes.task)
        app.use("/logout/", routes.logout)


        let PORT = process.env.PORT || 5000
        app.listen(5000, () => {
            console.log("Server has started!", PORT)
        })
    }, err => console.log(err.message))