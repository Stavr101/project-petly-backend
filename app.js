const express = require("express");
const logger = require("morgan");

const authRouter = require("./routes/api/auth");
const newsRouter = require("./routes/api/news");
const noticesRouter = require("./routes/api/notices");
const servicesRouter = require("./routes/api/services");
const userRouter = require("./routes/api/user");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const app = express();
const cors = require("cors");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/notices", noticesRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Bad request (invalid request body)" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
