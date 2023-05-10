const express = require("express");

// ** ENV configuration
const config = require("./src/configs");

// ** MongoDB
const mongoDb = require("./src/configs/db");
const router = require("./src/routes");

const app = express();

app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    error: err.stack,
  });
});

const start = () => {
  try {
    mongoDb(config.MONGO_URI);
    app.listen(config.PORT, () =>
      console.log(`Server started on port ${config.PORT}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
