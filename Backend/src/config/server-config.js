import { config } from "dotenv";

config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

export default {
    PORT,
    DB_URI,
};
