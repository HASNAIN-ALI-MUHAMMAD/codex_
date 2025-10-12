import { FileSystemMethods } from "../helpers/filesystem.js";
import { ProjectObject, ProjectType } from "../@types/projects.js";
import { ProjectInitializer } from "../initializer/index.js";

export class Project{
      private prPath:string;
      private prObject:ProjectObject;
      private fssMethods:FileSystemMethods;

      constructor(prj_path:string,project:ProjectObject){
            this.prPath= prj_path;
            this.prObject = project;
            this.fssMethods = new FileSystemMethods(prj_path); 
      }

      static start(project:string,type:ProjectType):Project{
            const fssss = new ProjectInitializer(project);
            return fssss.initializeProject(type);
      }



      getWorkingTree(){}
      checkHistory(){}
      checkStatus(){}
      restoreHistory(){}
      // etc...
}


