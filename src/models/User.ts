import { Document, model, Schema } from "mongoose";

export const ROLE = ["admin", "user", "moderator"] as const;

export interface IUser {
  username: string;
  email: string;
  password: string;
  age: number;
  role: (typeof ROLE)[number];
  isActive: boolean;
}

export type IUserDocument = IUser & Document;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    role: {
      type: String,
      required: true,
      enum: ROLE,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model<IUserDocument>("User", userSchema);

// username : nom d'utilisateur (String, obligatoire, min 3 caractères, max 20 caractères, unique)
// email : email (String, obligatoire, format email valide, unique)
// password : mot de passe (String, obligatoire, min 8 caractères, doit contenir au moins une majuscule, une minuscule et un chiffre)
// age : âge (Number, obligatoire, entre 18 et 100)
// role : rôle (String, obligatoire, valeurs possibles : "admin", "user", "moderator")
// isActive : statut d'activité (Boolean, par défaut true)
