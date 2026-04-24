const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhl.route");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", bfhlRoutes);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
