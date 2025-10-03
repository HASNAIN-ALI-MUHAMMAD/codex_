import {spawn,exec} from "node:child_process"
import { SANDBOX_DIR } from "../helpers/config_var_fs.js";


const platform = process.platform === "win32" ? "powershell.exe" :"bash"
const cli = spawn(platform,{
  cwd:SANDBOX_DIR,
  
})

cli.stdout.on('data', (data) => {
  // console.log(`[Shell Output]: ${data}`);
  return data
});

// Listen for errors
cli.stderr.on('data', (data) => {
  console.error(`[Shell Error]: ${data}`);
});

// Write a command to the shell's standard input
function sendCommand(command) {
  cli.stdin.write(command + '\n');
}


const Output = sendCommand('npm --version'); 
console.log(Output)

cli.stdin.end()
