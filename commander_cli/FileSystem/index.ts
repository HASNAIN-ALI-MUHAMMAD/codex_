import fs from "fs/promises";
import path from "path";

export class FileSystem {
  private SANDBOXPATH:string

  async readFile(filePath:string):Promise<string>{
    if(!this.safeDirParse(filePath)) return;
    const fileData:string = await fs.readFile(filePath,{
      encoding:"utf-8"
    })
    return fileData;    
  }

  safeDirParse(dirPath:string):boolean{
    if(!dirPath.startsWith(this.SANDBOXPATH)){
      return false;
    }
    return true;
  }

}


//dirPath:string,exceptions:string[]