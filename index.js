const express = require("express");

const app = express();

require("dotenv").config();
require("./startup/logging")();
require("./startup/config")();
if (process.env.NODE_ENV === "production") require("./startup/prod")(app);
require("./startup/db")();
require("./startup/routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
