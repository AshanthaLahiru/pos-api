import container from "./configIoc";
import express from "express";
import bodyParser from "body-parser";
import * as constants from "./utils/constants";

let app = express();

// Use middleware as required
app.use(bodyParser.json({ limit: 1000 + "kb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Base router
app.use("/", container.resolve("router"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
