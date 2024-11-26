import express from "express";
import {
  createStripePayment,
  createTransaction,
  listTransactions,
} from "../controllers/transactionController";

const router = express.Router();

router.get("/", listTransactions);
router.post("/", createTransaction);
router.post("/stripe/payment-intent", createStripePayment);

export default router;
