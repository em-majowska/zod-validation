import z from "zod";
import { ROLE } from "../models/User";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const userBodySchema = z.object({
  username: z.string().min(3).max(20).trim(),
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(8)
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Le mot de passe doit contenit au moins une majuscule, une minuscule eet un chiffre.",
    }),
  age: z.number().int().min(18).max(100),
  role: z.enum(ROLE),
  isActive: z.boolean().default(true),
});

export const createUserSchema = z.object({
  body: userBodySchema,
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, { message: "ID invalide" }),
  }),
  body: userBodySchema.partial(),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, { message: "ID invalide" }),
  }),
});

export const getUsersQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .default("1")
      .transform((val) => parseInt(val, 10)),
    limit: z
      .string()
      .default("10")
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(1).max(100)),
    role: z.enum(ROLE).optional(),
    isActive: z
      .enum(["true", "false"])
      .transform((val) => val === "true")
      .optional(),
  }),
});

export type TCreateUserInput = z.infer<typeof userBodySchema>;
export type TUpdateUserInput = z.infer<typeof updateUserSchema>["body"];
export type TGetUsersQuery = z.infer<typeof getUsersQuerySchema>["query"];

// Créez les schémas suivants :

// createUserSchema — valide le body pour la création :
// username : string, obligatoire, entre 3 et 20 caractères, avec .trim()
// email : string, obligatoire, format email, avec .toLowerCase()
// password : string, obligatoire, min 8 caractères, doit matcher /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/ (au moins une majuscule, une minuscule et un chiffre)
// age : number, obligatoire, entier entre 18 et 100
// role : enum z.enum(['admin', 'user', 'moderator'])
// isActive : boolean, optionnel

// updateUserSchema — valide params + body pour la mise à jour :
// params.id : string, ObjectId valide (regex /^[0-9a-fA-F]{24}$/)
// Mêmes champs que la création, mais tous .optional() dans le body

// getUserSchema — valide uniquement params.id (ObjectId valide)

// getUsersQuerySchema — valide les query params pour la liste avec pagination :

// query.page : string transformé en number via .transform(), optionnel, par défaut 1
// query.limit : string transformé en number via .transform(), optionnel, par défaut 10
// query.role : enum optionnel
// query.isActive : string transformé en boolean via .transform(), optionnel
