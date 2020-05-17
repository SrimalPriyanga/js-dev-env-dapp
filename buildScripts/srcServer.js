import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
// eslint-disable-next-line import/default
import config from "../webpack.dev";

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
    { id: 1, firstName: "bob1", lastName: "sm1" },
    { id: 2, firstName: "bob2", lastName: "sm2" },
    { id: 3, firstName: "bob3", lastName: "sm3" },
  ]);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  open("http://localhost:" + port);
});
