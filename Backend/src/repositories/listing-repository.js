import { Listing } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class ListingRepository extends CrudRepository {
    constructor() {
        super(Listing);
    }

    async getFilteredListings(
        limitPage,
        startIndexPage,
        furnished,
        offer,
        parking,
        type,
        searchTermFinal,
        sortBy,
        orderBy
    ) {
        try {
            const listings = await Listing.find({
                name: { $regex: searchTermFinal, $options: "i" },
                offer,
                furnished,
                parking,
                type,
            })
                .sort({ [sortBy]: orderBy })
                .limit(limitPage)
                .skip(startIndexPage);

            return listings;
        } catch (error) {
            // Handle error
            console.log("error in listing repo", error);
            throw error;
        }
    }
}

export default ListingRepository;
