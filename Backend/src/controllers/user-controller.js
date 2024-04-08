import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import { UserModifyService } from "../services/index.js";

let userModifyService;

class UserController {
    constructor() {
        userModifyService = new UserModifyService();
    }

    async updateUser(req, res) {
        try {
            if (req.user.id !== req.params.id) {
                errorObj.success = false;
                errorObj.message = "You can only update your own account!";
                return res.status(StatusCodes.UNAUTHORIZED).json(errorObj);
            }

            const { firstName, lastName, email, avatar } = req.body;

            const updatedUser = await userModifyService.updateUser(
                req.user.id,
                {
                    firstName,
                    lastName,
                    email,
                    avatar,
                }
            );

            successObj.success = true;
            successObj.message = "User updated successfully";
            successObj.data = updatedUser;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async deleteUser(req, res) {
        try {
            if (req.user.id !== req.params.id) {
                errorObj.success = false;
                errorObj.message = "You can only update your own account!";
                return res.status(StatusCodes.UNAUTHORIZED).json(errorObj);
            }

            const response = await userModifyService.deleteUser(req.params.id);

            if (response) {
                successObj.success = true;
                successObj.message = "User has been deleted!";
                res.clearCookie("token");
                return res.status(StatusCodes.OK).json(successObj);
            }
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getUserListings(req, res) {
        if (req.user.id !== req.params.id) {
            try {
                const updatedListing = await userModifyService.getUserListings(
                    req.params.id
                );
                successObj.success = true;
                successObj.message = "Listing updated successfully";
                successObj.data = updatedListing;
                return res.status(StatusCodes.OK).json(successObj);
            } catch (error) {
                // Handle error
                errorObj.message = error.message;
                errorObj.err = error;

                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(errorObj);
            }
        } else {
            errorObj.message = "You can only view your own listings!";
            errorObj.success = false;

            return res.status(StatusCodes.UNAUTHORIZED).json(errorObj);
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                errorObj.success = false;
                errorObj.message = "ID is required";
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }
            console.log("req.params.id", req.params.id);
            const listing = await userModifyService.getUser(req.params.id);

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
}

export default UserController;
