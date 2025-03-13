import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import autoRoutes from "./routes/auto.routes";
import diagnosticoRoutes from "./routes/diagnostico.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/api/autos", autoRoutes);
app.use("/api/diagnosticos", diagnosticoRoutes);

app.listen(PORT, () => {
  console.log(`[Server] Servidor corriendo en el puerto ${PORT}`);
});
