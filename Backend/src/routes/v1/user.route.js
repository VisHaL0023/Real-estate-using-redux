import { Router } from "express";
import { authenticate } from "../../middlewares/index.js";
import { UserController } from "../../controllers/index.js";

const router = Router();

const userController = new UserController();

router.post("/update/:id", authenticate, userController.updateUser);
router.delete("/delete/:id", authenticate, userController.deleteUser);
router.get("/listings/:id", authenticate, userController.getUserListings);
router.get("/:id", authenticate, userController.getUser);

export default router;
