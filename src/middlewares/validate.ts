import { NextFunction, Request, Response } from "express";
import z from "zod";

const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      // throw result.error
      return next(result.error);
    }

    const data = result.data as any;
    if (data.body) req.body = data.body;
    if (data.params) req.params = data.params;
    if (data.query) req.query = data.query;

    next();
  };
};

export default validate;

// Prend un schéma Zod en paramètre (fonction factory)
// Parse req.body, req.params et req.query avec ce schéma
// Si la validation échoue → renvoie une réponse 400 avec le détail des erreurs (champ + message)
// Si tout est valide → appelle next() pour passer au controller
