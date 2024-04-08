import { Router } from "express";
import { authenticate } from "../../middlewares/index.js";
import { ListingController } from "../../controllers/index.js";

const router = Router();

const listingController = new ListingController();

router.post("/create", authenticate, listingController.createListing);
router.delete("/delete/:id", authenticate, listingController.deleteListing);
router.post("/update/:id", authenticate, listingController.updateListing);
router.get("/get/:id", listingController.getListing);
router.get("/get", listingController.getListings);

export default router;
