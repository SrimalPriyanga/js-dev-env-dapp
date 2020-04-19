import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);

app.get("/users", function (req, res) {
  res.json([
    { id: 1, fname: "bob1", lname: "sm1" },
    { id: 2, fname: "bob2", lname: "sm2" },
    { id: 3, fname: "bob3", lname: "sm3" },
  ]);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  open("http://localhost:" + port);
});
