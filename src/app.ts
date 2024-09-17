import express, { NextFunction, Request, Response, request } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app = express();

// parser
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5010"] }));
app.use(cookieParser());

// application routes
app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  res.send("Hello, welcome to test route");
};

app.get("/", test);
//  global error  handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
