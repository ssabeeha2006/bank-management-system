const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./routes/authRoutes");
app.use("/", routes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});