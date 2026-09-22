import { NextFunction, Request, Response } from "express";

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

  res.status(500).json({ message: "Erreur interne du serveur" });
};

export default errorHandler;
