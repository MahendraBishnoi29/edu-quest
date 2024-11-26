import express from "express";
import {
  createStripePayment,
  createTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/", createTransaction);
router.post("/stripe/payment-intent", createStripePayment);

export default router;
