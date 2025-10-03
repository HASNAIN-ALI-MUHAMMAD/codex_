import { FileSystemMethods } from "../helpers/filesystem.js";
import { ProjectObject } from "../@types/projects.js";

export class Project{
      private prPath:string;
      private prObject:ProjectObject;
      private fssMethods:FileSystemMethods;

      constructor(prj_path:string,project:ProjectObject){
            this.prPath= prj_path;
            this.prObject = project;
            this.fssMethods = new FileSystemMethods(prj_path); 
      }
      checkHistory(){}
      checkStatus(){}
      restoreHistory(){}
      // etc...
}