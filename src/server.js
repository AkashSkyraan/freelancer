import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import setupSwagger from "./config/swagger.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use("/uploads", express.static(path.resolve("src/uploads")));

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("freelancer backend server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Freelancer server running successfully on port ${PORT}`);
});
