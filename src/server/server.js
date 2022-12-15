require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
// import multiparty from "multiparty";

const app = express();

const webpack = require("webpack");
const config = require("../../webpack.config.js");
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

//must be in this order 123
// 1
app.use(webpackDevMiddleware);
// 2
app.use(webpackHotMiddleware);

// 3
const staticMiddleware = express.static("dist");

app.use(staticMiddleware);

const email = process.env.EMAIL;
const pass = process.env.PASS;

app.listen(8080, () => {
  console.log("fuck yourself");
});
