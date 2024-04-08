import { UserRepository, ListingRepository } from "../repositories/index.js";

class UserModifyService {
    constructor() {
        this.userModifyService = new UserRepository();
        this.listingRepository = new ListingRepository();
    }

    async updateUser(id, { userData }) {
        try {
            const updatedUser = await this.userModifyService.update(
                id,
                userData
            );

            return updatedUser;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const response = await this.userModifyService.destroy(id);

            return response;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async getUserListings(id) {
        try {
            const listings = await this.listingRepository.findListing(id);
            return listings;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async getUser(id) {
        try {
            console.log("id", id);
            const listing = await this.userModifyService.get(id);

            return listing;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }
}

export default UserModifyService;
