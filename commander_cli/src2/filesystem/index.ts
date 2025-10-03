import fs from "fs";
import os from "os"
import path from "path";
import { FileSystemMethods } from "../helpers/filesystem.js";
import { SANDBOX_DIR_PROJECTS } from "../helpers/config_var_fs.js";
import { Project } from "../project/index.js";

export class FileSystem {
    private SANDBOXPATH:string;
    private fssMethods:FileSystemMethods;
    private projectPath:string

    constructor(project:string){
        this.SANDBOXPATH = SANDBOX_DIR_PROJECTS
        this.projectPath = path.join(this.SANDBOXPATH,project)
        const fssMethods= new FileSystemMethods(this.projectPath)
        this.fssMethods  = fssMethods
        if(this.fssMethods.safeDirParse(this.projectPath)){
            if(!fs.existsSync(this.SANDBOXPATH)) fs.mkdirSync(this.SANDBOXPATH);
        }
    }

    initializeProject(){
      if(this.fssMethods.createDir(this.projectPath)){
        return new Project(this.projectPath,{
          path:this.projectPath,
          status:"new",
          timeCreated:new Date()
        })
      }
      return new Project(this.projectPath,{
        path:this.projectPath,
        status:"exists"
      })
    }














}

const fss  = new FileSystem("node_123")
const pr = fss.initializeProject()