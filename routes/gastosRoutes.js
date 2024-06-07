import { Router } from "express";
import {
  createGasto,
  deleteGasto,
  getAllGastos,
  getGastoById,
  updateGasto,
} from "../controllers/gastosController.js";

const router = Router();

router.get("/", getAllGastos);
router.get("/:id", getGastoById);
router.post("/", createGasto);
router.put("/", updateGasto);
router.delete("/", deleteGasto);

export default router;