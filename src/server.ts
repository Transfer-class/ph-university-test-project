import mongoose from "mongoose";
import app from "./app";
import { configuration } from "./app/config";
import { Server } from "http";
let server: Server;

async function main() {
  try {
    await mongoose.connect(configuration.database_url as string);
    server = app.listen(configuration.port, () => {
      console.log(`my server is running on port : ${configuration.port}`);
    });
  } catch (error) {
    console.log("from server:", error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(" unhandledRejection is detected,shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaught exception is detected");
  process.exit(1);
});
