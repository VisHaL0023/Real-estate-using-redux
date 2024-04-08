import { ListingRepository } from "../repositories/index.js";

class ListingService {
    constructor() {
        this.listingRepository = new ListingRepository();
    }

    async createListing(listingsData) {
        try {
            const listing = await this.listingRepository.create(listingsData);
            return listing;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async deleteListing(id, userId) {
        const listing = await this.listingRepository.get(id);

        if (!listing) {
            // eslint-disable-next-line no-throw-literal
            throw {
                message: "Listing not found!",
            };
        }

        if (userId != listing.userRef) {
            // eslint-disable-next-line no-throw-literal
            throw {
                message: "You can only delete your own listings!",
            };
        }

        try {
            await this.listingRepository.destroy(id);
            return true;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async updateListing(id, listingsData) {
        const listing = await this.listingRepository.get(id);
        if (!listing) {
            // eslint-disable-next-line no-throw-literal
            throw {
                message: "Listing not found!",
            };
        }
        if (id !== listing.userRef) {
            // eslint-disable-next-line no-throw-literal
            throw {
                message: "You can only update your own listings!",
            };
        }

        try {
            const updatedListing = await this.listingRepository.update(
                id,
                listingsData,
                { new: true }
            );
            return updatedListing;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async getListing(id) {
        try {
            const listing = await this.listingRepository.get(id);
            if (!listing) {
                // eslint-disable-next-line no-throw-literal
                throw {
                    message: "Listing not found!",
                };
            }
            return listing;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async getListings(reqbody) {
        try {
            let {
                limit,
                startIndex,
                furnished,
                offer,
                parking,
                type,
                searchTerm,
                sort,
                order,
            } = reqbody.query;
            const limitPage = parseInt(limit) || 9;
            const startIndexPage = parseInt(startIndex) || 0;
            const searchTermFinal = searchTerm || "";
            const sortBy = sort || "createdAt";
            const orderBy = order || "desc";

            if (offer === undefined || offer === "false") {
                offer = { $in: [false, true] };
            }

            if (furnished === undefined || furnished === "false") {
                furnished = { $in: [false, true] };
            }

            if (parking === undefined || parking === "false") {
                parking = { $in: [false, true] };
            }

            if (type === undefined || type === "all") {
                type = { $in: ["sale", "rent"] };
            }

            const listings = await this.listingRepository.getFilteredListings(
                limitPage,
                startIndexPage,
                furnished,
                offer,
                parking,
                type,
                searchTermFinal,
                sortBy,
                orderBy
            );

            return listings;
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }
}

export default ListingService;
