import container from "./configIoc";
import express from "express";
import bodyParser from "body-parser";
import * as constants from "./utils/constants";
import CrossOriginMW from "./middleware/CrossOriginMW"

let app = express();

// Use middleware as required
app.use(bodyParser.json({ limit: 1000 + "kb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(new CrossOriginMW().middleware)

// Base router
app.use("/", container.resolve("router"));

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    code: err.name,
    error: err.message,
  });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
