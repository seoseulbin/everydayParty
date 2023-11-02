const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const mainRouter = require("./routers/mainRouter");
const cartRouter = require("./routers/cartRouter");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", mainRouter);
app.use("/carts", cartRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error");
});

app.listen(process.env.PORT, () => {
    console.log(`server on port ${process.env.PORT}`);
});
