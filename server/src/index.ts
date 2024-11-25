import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import * as dynamoose from "dynamoose";

import courseRoutes from "./routes/courseRoute";
import userClerkRoutes from "./routes/userClerkRoutes";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";

// Configuration
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  dynamoose.aws.ddb.local();
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(clerkMiddleware());

// Routes

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/courses", courseRoutes);
app.use("/users/clerk", requireAuth(), userClerkRoutes);

const PORT = process.env.PORT || 3000;

if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
