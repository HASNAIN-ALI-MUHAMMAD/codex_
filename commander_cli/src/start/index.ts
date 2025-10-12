import { Command } from "commander";
import { READDIR } from "../@types/files.js";
import { Project } from "../project/index.js";

const programStart = new Command("start");


programStart
  .description("Start the application")
  .action(() => {
    console.log("restarting the app...");
    console.log("Filtered files from the filesystem folder: ");
  });

export default programStart;
