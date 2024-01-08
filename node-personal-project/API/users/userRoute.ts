import express from "express";
import { loginUser, registerUser, getUser, deleteUser } from "./usersCont";

const router = express.Router();

router.post("/register", registerUser)
      .post("/login", loginUser)
      .get("/get-user", getUser)
      .delete("/delete-user", deleteUser)

export default router;