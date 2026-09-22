import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Erreur de validation",
      errors: Object.values(err.errors).map((e: any) => e.message),
    });
  }

  if (err.code === 11000) {
    res.status(409).json({
      message: "Cette valeur existe déjà",
      field: Object.keys(err.keyPattern)[0],
    });
  }

  if (err.name === "CastError") {
    res.status(400).json({});
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  res.status(500).json({ message: "Erreur interne du serveur" });
};

export default errorHandler;
