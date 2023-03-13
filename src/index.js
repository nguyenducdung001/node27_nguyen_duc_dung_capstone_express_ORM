const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("."));

const cors = require("cors");
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const rootRoute = require("./routes/rootRoute");
app.use("/api", rootRoute);
