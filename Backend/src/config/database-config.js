import { connect as _connect } from "mongoose";
import ServerConfig from "./server-config.js";

async function connect() {
    await _connect(ServerConfig.DB_URI);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { connect };
