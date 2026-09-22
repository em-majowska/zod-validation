import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Erreur de validation",
          errors: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
};

export default validate;

// Prend un schéma Zod en paramètre (fonction factory)
// Parse req.body, req.params et req.query avec ce schéma
// Si la validation échoue → renvoie une réponse 400 avec le détail des erreurs (champ + message)
// Si tout est valide → appelle next() pour passer au controller
