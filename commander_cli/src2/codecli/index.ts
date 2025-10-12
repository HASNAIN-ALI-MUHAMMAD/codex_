import { spawn, exec, execFile, execSync } from "node:child_process"
import { FileSystemMethods } from "../helpers/filesystem.js";
import { execCommandOutput } from "../@types/codecli.js";
import { clear } from "node:console";
import { hasUncaughtExceptionCaptureCallback } from "node:process";

const platform = process.platform === "win32" ? "powershell.exe" : "bash"



export class Cli {
  private platform: string;
  constructor() {
    this.platform = process.platform === "win32" ? "powershell.exe" : "bash";
  }

  execCommand(cmd: string, cwd: string): Promise<execCommandOutput> | execCommandOutput {
    try {
      // if (FileSystemMethods.safeDirParse(cwd)) {
      return new Promise((resolve, reject) =>
        exec(cmd, { cwd: cwd, shell: this.platform }, (err, stdout, stderr) => {
          if (err) {
            reject({
              type: "error",
              data: err,
              datetime: Date.now()
            } as unknown as execCommandOutput);
            return;
          }
          else if (stderr) {
            reject({
              type: "error",
              data: stderr,
              datetime: Date.now()
            } as unknown as execCommandOutput)
            return;
          }
          //          else if (stdout) {
          resolve({
            type: "success",
            data: stdout,
            datetime: Date.now()
          } as unknown as execCommandOutput);
          return;
          // }
          // else {
          //   resolve({ type: "failure", data: err, date: Date.now() } as unknown as execCommandOutput)
          //   return;
          // }
        }));
    }
    // }
    catch (error) {
      return {
        type: "failure",
        data: error,
        datetime: Date.now()
      }
    }
  }

  async execCommands(cmds: string[], cwd: string): Promise<execCommandOutput | execCommandOutput[]> {
    try {
      let res: execCommandOutput[];
      const promises = cmds.map(cmd => this.execCommand(cmd, cwd));
      const results = await Promise.all(promises);
      res = results;
      return res;
    } catch (error) {
      return {
        type: "failure",
        data: error,
        datetime: Date.now()
      }
    }
  }


}


// running test commands
//
// const cd = new Cli();
// // const data = await cd.execCommand("node dist/src2/initializer/index.j", process.cwd());
// // console.log(data);
// const res = await cd.execCommands(["ls -la", "node -v", "npm -v"], process.cwd())
//
// console.log(res)








