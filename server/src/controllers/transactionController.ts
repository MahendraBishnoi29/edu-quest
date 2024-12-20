import Stripe from "stripe";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Course from "../models/courseModel";
import Transaction from "../models/transactionModel";
import UserCourseProgress from "../models/userCourseProgressModel";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is required but not found in ENV variables!"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.status(200).json({
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating stripe payment intent", error });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

  try {
    const course = await Course.get(courseId);

    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider,
    });

    await newTransaction.save();

    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: course.sections.map((section: any) => ({
        sectionId: section.id,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.id,
          completed: false,
        })),
      })),
    });

    await initialProgress.save();

    await Course.update(
      { courseId },
      {
        $ADD: {
          enrollments: [{ userId }],
        },
      }
    );

    res.status(200).json({
      message: "Purchased course successfully",
      data: {
        transaction: newTransaction,
        courseProgress: initialProgress,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating transaction enrollment", error });
  }
};

export const listTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const transactions = userId
      ? await Transaction.query("userId").eq("userId").exec()
      : await Transaction.scan().exec();

    res.status(200).json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "error retrieving transactions", error });
  }
};
