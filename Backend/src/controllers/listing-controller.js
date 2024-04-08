import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import { ListingService } from "../services/index.js";

let listingService;

class ListingController {
    constructor() {
        listingService = new ListingService();
    }

    async createListing(req, res) {
        try {
            const {
                name,
                description,
                address,
                regularPrice,
                discountPrice,
                bathrooms,
                bedrooms,
                furnished,
                parking,
                type,
                offer,
                imageUrl,
            } = req.body;
            if (
                !name ||
                !description ||
                !address ||
                !regularPrice ||
                !discountPrice ||
                !bathrooms ||
                !bedrooms ||
                !furnished ||
                !parking ||
                !type ||
                !offer ||
                !imageUrl
            ) {
                errorObj.success = false;
                errorObj.message = "All fields are required";
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const userId = req.user.id;
            const listing = await listingService.createListing({
                name,
                description,
                address,
                regularPrice,
                discountPrice,
                bathrooms,
                bedrooms,
                furnished,
                parking,
                type,
                offer,
                imageUrl,
                userRef: userId,
            });

            successObj.success = true;
            successObj.message = "Listing created successfully";
            successObj.data = listing;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async deleteListing(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            if (!id) {
                errorObj.success = false;
                errorObj.message = "ID is required";
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }
            const response = await listingService.deleteListing(id, userId);

            if (response) {
                successObj.success = true;
                successObj.message = "Listing deleted successfully";
                return res.status(StatusCodes.OK).json(successObj);
            }
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async updateListing(req, res) {
        try {
            const { id } = req.params.id;
            if (!id) {
                errorObj.success = false;
                errorObj.message = "ID is required";
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }
            const updatedListing = await listingService.updateListing(
                id,
                req.body
            );
            successObj.success = true;
            successObj.message = "Listing updated successfully";
            successObj.data = updatedListing;
            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getListing(req, res) {
        try {
            const { id } = req.params.id;
            if (!id) {
                errorObj.success = false;
                errorObj.message = "ID is required";
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }
            const listing = await listingService.getListing(id);

            successObj.success = true;
            successObj.message = "Listing data";
            successObj.data = listing;
            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getListings(req, res) {
        try {
            const listings = await listingService.getListings(req);
            successObj.success = true;
            successObj.message = "Listing Data";
            successObj.data = listings;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }
}

export default ListingController;
