import { Command } from "commander";
import { FileSystem } from "../../src2/filesystem/index.js";
import { READDIR } from "../@types/files.js";

const programStart = new Command("start");

programStart
  .description("Start the application")
  .action(() => {
    console.log("restarting the app...");
    console.log("Filtered files from the filesystem folder: ");
  });

export default programStart;
