require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const webpack = require("webpack");
const config = require("../../webpack.config.js");
const compiler = webpack(config);
const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

const app = express();
// Middleware
// 1
app.use(webpackDevMiddleware);
// 2
app.use(webpackHotMiddleware);
// 3
const staticMiddleware = express.static("dist");
app.use(staticMiddleware);
app.use(express.json());

const email = process.env.EMAIL;
const pass = process.env.PASS;

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html')
// })

app.post("/", (req, res) => {
  const message = `<p>email: ${req.body.email}</p>
  <p>name: ${req.body.name}<p/>
  <p/>${req.body.message}<p/>`;

  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: email,
      pass: pass
    }
  });
  const mailOptions = {
    subject: `Message from ${req.body.email}: ${req.body.name}`,
    from: email,
    to: email,
    html: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("email SeNt: " + info.response);
      res.send("success");
    }
  });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
