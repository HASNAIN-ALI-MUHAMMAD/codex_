import { FileSystemMethods } from "../helpers/filesystem.js";
import { ProjectObject, ProjectType } from "../@types/projects.js";
import { ProjectInitializer } from "../initializer/index.js";
import { Cli } from "../codecli/index.js";
import path from "path";


// project entry point to create project, the project intitializer shall provide helper methods for the project class
// 

export class Project{
      private prPath:string;
      private prObject:ProjectObject;
      private fssMethods:FileSystemMethods;
      private cli:Cli;

      constructor(prj_path:string,project:ProjectObject){
            this.prPath= prj_path;
            this.prObject = project;
            this.fssMethods = new FileSystemMethods(prj_path); 
            this.cli = new Cli();
      }

      static async Start(project:string,type:ProjectType):Promise<Project>{
            try {
                  const fssss = new ProjectInitializer(project);
                  return await fssss.initializeProject(type);
            } 
            catch (error) {
                  console.error(error);
            }
      }

      async createFile(filename:string):Promise<{}>{
            try {
                  const filepath:string = path.join(this.prPath,filename);
                  const createFile =await  this.fssMethods.createFile(filename,filepath);
                  return createFile;
            } catch (error) {
                  console.log(error)
            } 
      }
      async getWorkingTree(){ 
            try {
                  const tree = await this.cli.execCommand("tree .",this.prPath)
                  return tree;
            } 
            catch (error) {
                  console.error(error)      
            }
      }

      async readFile(filename:string){
            const filepath = path.join(this.prPath,filename);
            const filedata = this.fssMethods.readFile(filepath);
            
            //return a a structured res with filename,path and string format utf8 data
      }

      checkHistory(){}
      checkStatus(){}
      restoreHistory(){}
      // etc...
}


const pr = await Project.Start("test","nextjs")
const tree_data = await pr.getWorkingTree()
console.log(`working tree of the project: \n ${tree_data.data}`)
