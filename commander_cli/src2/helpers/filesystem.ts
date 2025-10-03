import fs from "fs/promises"
import {Dirent,existsSync,mkdirSync} from "fs"
import path from "path";
import os from "os"
import { READDIR, READDIRFILE } from "../@types/files.js";
import { SANDBOX_DIR } from "./config_var_fs.js";
import { SANDBOX_DIR_PROJECTS } from "./config_var_fs.js";

export class FileSystemMethods{
  sdDir:string;
  toFilterDirs = ["node_modules",".dist","dist","private","public",".vscode"];

  constructor(sdDir:string){
    if(!this.safeDirParse(sdDir)){
      this.sdDir  =sdDir;
    }
  }
  // reads a directory this must be  within the sandbox directory
  // provides a working tree and structure of the codebase
  async readDir(folder: string):Promise<READDIR[]> {
    const absDir = path.join(this.sdDir, folder);

    let entries: Dirent[];
    try {
      entries = await fs.readdir(absDir, { withFileTypes: true });
    } catch (err) {
      console.error(`Error reading directory ${absDir}`, err);
      return [];
    }

    return Promise.all(entries.filter((f,i)=>f.isDirectory && !this.toFilterDirs.includes(f.name)).map(async (entry) => {
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
  async filterFiles(dirsData: READDIR[]): Promise<READDIRFILE[]> {
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

  // individual file reader
  async readFile(pathname:string):Promise<string>{
    try {
      const filedata:string = await fs.readFile(pathname,{encoding:"utf-8",flag:"r"})
      return filedata
    } catch (error) {
      throw error
    }
  }
  
  // reads all filtered files and adds the string format file data
  async readFiles(arrFiles:READDIRFILE[]){
    const ext = (filename:string)=> {
      return filename.split('.').at(-1)
    }

    const filesRead = Promise.all(arrFiles.map(async (u)=>({
      ...u,
      fileType:ext(u.name),
      data:await this.readFile(u.absPath)
    })))
    return filesRead
  }

  async createDir(path:string){
    if(!existsSync(path)) {
      mkdirSync(path)
      return false
    }
    return true
  }

  
    safeDirParse(pr_path:string):boolean{
        if(!pr_path.startsWith(SANDBOX_DIR_PROJECTS,0)){
          throw new Error("Access denied!")
        }
        return true;
    }

}

if(process.argv[1] === new URL(import.meta.url).pathname){

  const fssm = new FileSystemMethods(path.join(os.homedir(),"D"))

  const dirs = await fssm.readDir("code/js/codex/codex_/commander_cli")
  const filtered = await fssm.filterFiles(dirs)
  const sampleData = await fssm.readFile(filtered[0].absPath)
  const readall = await fssm.readFiles(filtered)
  console.log("DIRS: ",dirs)
  console.log("FILTERED DIRS: ",filtered)
  console.log("READ A SAMPLE FILE: ",sampleData)
  console.log("READ ALL FILES: ",readall)
}