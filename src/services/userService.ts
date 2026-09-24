import User, { IUserDocument } from "../models/User";
import {
  TGetUsersQuery,
  TCreateUserInput,
  TUpdateUserInput,
} from "../validations/userSchemas";

export const getAllUsers = async (options: TGetUsersQuery) => {
  const { page, limit, isActive, role } = options;

  const filter: Record<string, any> = {};
  if (isActive !== undefined) filter.isActive = isActive;
  if (role !== undefined) filter.role = role;

  const users = await User.find(filter)
    .select("-password")
    .skip((page - 1) * limit)
    .limit(limit);

  const total: number = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    data: users,
    page: page,
    limit: limit,
    total,
    totalPages,
  };
};

export const getUserById = async (
  id: string,
): Promise<IUserDocument | null> => {
  return await User.findById(id).select("-password");
};

export const createUser = async (
  data: TCreateUserInput,
): Promise<IUserDocument> => {
  const user = new User(data);
  await user.save();
  return user;
};

export const updateUser = async (
  id: string,
  data: TUpdateUserInput,
): Promise<IUserDocument | null> => {
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

export const deleteUser = async (id: string): Promise<IUserDocument | null> => {
  return await User.findByIdAndDelete(id);
};
