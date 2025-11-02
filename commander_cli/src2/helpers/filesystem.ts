import fs from "fs/promises"
import { Dirent, existsSync, mkdirSync } from "fs"
import path from "path";
import os from "os"
import { READDIR, READDIRFILE } from "../@types/files.js";
import { SANDBOX_DIR } from "./config_var_fs.js";
import { SANDBOX_DIR_PROJECTS } from "./config_var_fs.js";

export class FileSystemMethods {
  private sdDir: string;
  private toFilterDirs = ["node_modules", ".dist", "dist", "private", "public", ".vscode"];

  constructor(sdDir: string) {
    if (!FileSystemMethods.safeDirParse(sdDir)) {
      this.sdDir = sdDir;
    }
  }
  // reads a directory this must be  within the sandbox directory
  // provides a working tree and structure of the codebase
  async readDir(folder: string): Promise<READDIR[]> {
    const absDir = path.join(this.sdDir, folder);

    let entries: Dirent[];
    try {
      entries = await fs.readdir(absDir, { withFileTypes: true });
    } catch (err) {
      console.error(`Error reading directory ${absDir}`, err);
      return [];
    }

    return Promise.all(entries.filter((f, i) => f.isDirectory && !this.toFilterDirs.includes(f.name)).map(async (entry) => {
      const fullPath = path.resolve(absDir, entry.name);
      const relPath = path.relative(this.sdDir, fullPath);

      if (entry.isDirectory()) {
        return {
          type: "dir",
          name: entry.name,
          absPath: fullPath,
          relPath,
          children: await this.readDir(relPath),
        };
      }

      const { size } = await fs.stat(fullPath);
      return {
        type: "file",
        name: entry.name,
        absPath: fullPath,
        relPath,
        size,
      };
    }));
  }

  // filters the files for the tree
  private async filterFiles(dirsData: READDIR[]): Promise<READDIRFILE[]> {
    const files: READDIRFILE[] = [];

    for (const f of dirsData) {
      if (f.type === "file") {
        files.push(f);
      } else if (f.type === "dir") {
        files.push(...(await this.filterFiles(f.children)));
      }
    }

    return files;
  }

  // reads all filtered files and adds the string format file data to the object
  // private and used in the class for the readDir method
  private async readFilesDir(arrFiles: READDIRFILE[]) {
    const ext = (filename: string) => {
      return filename.split('.').at(-1)
    }
    const filesRead = Promise.all(arrFiles.map(async (u) => ({
      ...u,
      fileType: ext(u.name),
      data: await this.readFile(u.absPath)
    })))
    return filesRead
  }

  // individual file reader
  async readFile(pathname: string): Promise<string> {
    try {
      const filedata: string = await fs.readFile(pathname, { encoding: "utf-8", flag: "r" })
      return filedata
    } catch (error) {
      throw error
    }
  }
  // creates a file at the given path
  async createFile(filename:string,path:string){
    if(FileSystemMethods.safeDirParse(path)){
      if(existsSync(path)){
        return {
          filename:filename,
          path:path,
          status:"file_exists"
        }
      }
      await fs.writeFile(path,"");
      return {
        filname:filename,
        file_path:path,
        status:"new_file"
      }
    }    
  }

  // creating a directory
  async createDir(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path)
      return false
    }
    return true
  }

  //static method for safe directory usage
  static safeDirParse(pr_path: string): boolean {
    if (!pr_path.startsWith(SANDBOX_DIR_PROJECTS, 0)) {
      throw new Error("Access denied!")
    }
    return true;
  }

}

if (process.argv[1] === new URL(import.meta.url).pathname){}