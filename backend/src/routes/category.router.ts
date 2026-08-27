import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();
const controller = new CategoryController();

router.get( "/",
    controller.findAll
);

export default router