import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import setupSwagger from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("freelancer backend server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Freelancer server running successfully on port ${PORT}`);
});
