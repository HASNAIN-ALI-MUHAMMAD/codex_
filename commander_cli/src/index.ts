import { Command } from "commander";
import programStart from "./start/index.js";

const program = new Command();

program
  .name("codex")
  .description("An autonomous coding agent!")
    .action(pr=>{
        console.log("Started again for the second time!")
        programStart.action(()=>{
            console.log("Started again for the third time!")
        })
    })
  .version("1.0.0","-v","Check out our version mate!")

program
    .addCommand(programStart)


program.parse(process.argv);