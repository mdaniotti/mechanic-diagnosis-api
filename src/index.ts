import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import autoRoutes from "./routes/AutoRoutes";
import diagnosticoRoutes from "./routes/DiagnosticoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/autos", autoRoutes);
app.use("/diagnosticos", diagnosticoRoutes);

app.listen(PORT, () => {
  console.log(`[Server] Servidor corriendo en el puerto ${PORT}`);
});
