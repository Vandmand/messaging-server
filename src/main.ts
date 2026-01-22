import { config } from "dotenv";
import { startServer } from "./server";

/**
 * Initialize the .env config file
 * @see https://dev.to/dallington256/how-to-use-env-file-in-nodejs-578h
 */
config();

// Start the express server
startServer();
