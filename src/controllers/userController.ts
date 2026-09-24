import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import { TGetUsersQuery } from "../validations/userSchemas";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const options = req.query as unknown as TGetUsersQuery;
    const users = await userService.getAllUsers(options);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id as string);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.updateUser(
      req.params.id as string,
      req.body,
    );
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.deleteUser(req.params.id as string);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
