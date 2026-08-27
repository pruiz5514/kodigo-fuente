import express from "express";
import DiscountController from "../controllers/discount.controller.js";
const router = express.Router();
const controller = new DiscountController();
router.get("/", controller.findAll);
export default router;
