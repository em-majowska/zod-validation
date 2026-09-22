import express from "express";
import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import userRouter from "./routes/userRoutes";

const app = express();

connectDB();

app.use(express.json());
app.use("/api/users", userRouter);
app.use(errorHandler);

export default app;
