import express from "express";
import path from "path";
import open from "open";
import compression from "compression";
const port = 3000;
const app = express();

app.use(express.static("dist"));
app.use(compression());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  open("http://localhost:" + port);
});
