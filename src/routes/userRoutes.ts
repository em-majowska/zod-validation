import express from "express";
import validate from "../middlewares/validate";
import {
  createUserSchema,
  getUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "../validations/userSchemas";
import * as userController from "../controllers/userController";
const router = express.Router();

router.get("/", validate(getUsersQuerySchema), userController.getUsers);
router.get("/:id", validate(getUserSchema), userController.getUserById);
router.post("/", validate(createUserSchema), userController.createUser);
router.put("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", validate(getUserSchema), userController.deleteUser);

export default router;
