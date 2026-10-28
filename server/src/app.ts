import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth-routes.ts";
import courseRoutes from "./routes/course-routes.ts";

const app = express();


// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);


// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "Course selling API is running",
  });
});


// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});