const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
const PatientRoutes = require("./routes");

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use("/patients", PatientRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

