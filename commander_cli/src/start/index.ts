import { Command } from "commander";
import { FileSystem } from "../../FileSystem/index.js";
import { READDIR } from "../../FileSystem/@types/FileSystem.js";

const programStart = new Command("start");
const FS  = new FileSystem();
programStart
  .description("Start the application")
  .action(() => {
    console.log("restarting the app...");
    console.log("Filtered files from the filesystem folder: ");
  });

export default programStart;
