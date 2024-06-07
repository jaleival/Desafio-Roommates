import express from 'express';
import path from 'path';
import RoommatesRouter from './routes/roommatesRoutes.js';
import GastosRouter from './routes/gastosRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

app.use("/roommates", RoommatesRouter);
app.use("/gastos", GastosRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});