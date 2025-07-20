const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const Sentry = require("@sentry/node");
require("dotenv").config();
const db = require("./db");

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

const healthRouter = require("./routes/health");
app.use("/", healthRouter);

// Error handling
app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
