import express from "express";
import DiscountController from "../controllers/discount.controller.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { discountSchema } from "../schemas/discount.schema.js";

const router = express.Router();
const controller = new DiscountController();

router.get( "/",
    controller.findAll
);

router.get( "/summary",
    controller.getSummary
);

router.post( "/",
    validatorHandler(discountSchema),
    controller.create
);

router.delete( "/:id",
    controller.delete
);

export default router
