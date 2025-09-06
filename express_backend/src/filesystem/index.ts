import fs from "fs/promises";
import path from "path";
import { READDIR, READDIRDIR, READDIRFILE,FILESDATATYPE } from "./@types/FileSystem.js";

export class FileSystem {
  private SANDBOXPATH:string;

  async readSandBoxDir(folder: string, cwd: string) {
    const SANDBOX = path.join(cwd, "sandbox");
    this.SANDBOXPATH = SANDBOX
    const absDir = path.join(SANDBOX, folder);
    const entries = await fs.readdir(absDir, { withFileTypes: true });

    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.resolve(absDir, entry.name);
        const relPath = path.relative(SANDBOX, fullPath);

        if (entry.isDirectory()) {
          const dir: READDIRDIR = {
            name: entry.name,
            absPath: fullPath,
            relPath,
            type: "dir",
            children: await this.readSandBoxDir(path.relative(SANDBOX, fullPath), cwd),
          };
          return dir;
        } else {
          const stats = await fs.stat(fullPath);
          const file: READDIRFILE = {
            name: entry.name,
            absPath: fullPath,
            relPath,
            type: "file",
            size: stats.size,
          };
          return file;
        }
      })
    );
    return files;
  }

  async filterFiles(readDirData:READDIR[]|READDIRDIR[]){

    const FILESPROM = readDirData.map(async (dir)=>{
      if(dir.type == "dir" && dir.children !==null){
        const nestedFiles= await this.filterFiles(dir.children);
        return nestedFiles
      }
      else{
        return [dir]
      }
    })
    const nestedFilesArr =Promise.all(FILESPROM);
    const FILESALL = (await nestedFilesArr).flat();
    return FILESALL
  }

  async readFile(filePath:string):Promise<string>{
    const fileData:string = await fs.readFile(filePath,{
      encoding:"utf-8"
    })
    return fileData;    
  }

  async readAllFilesDir(exceptions,DIRS:READDIR[]){
    let FILESDATA:FILESDATATYPE[];
    const FILTEREDFILES:[] = await this.filterFiles(DIRS);
    const filesPromise = FILTEREDFILES.map(async(file:READDIRFILE)=>{
      const FILEDATA = await this.readFile(file.absPath)
      return {data:FILEDATA,absPath:file.absPath};
    })
    FILESDATA = await Promise.all(filesPromise);
    return FILESDATA
  }

  safeDirParse(dirPath:string):boolean{
    if(!dirPath.startsWith(this.SANDBOXPATH)){
      return false;
    }
    return true;
    
  }

}


//dirPath:string,exceptions:string[]