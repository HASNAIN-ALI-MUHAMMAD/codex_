import fs, { truncate } from "fs";
import os from "os"
import path from "path";
import { FileSystemMethods } from "../helpers/filesystem.js";
import { SANDBOX_DIR_PROJECTS } from "../helpers/config_var_fs.js";
import { Project } from "../project/index.js";
import { ProjectType } from "../@types/projects.js";
import { Cli } from "../codecli/index.js";
import { error } from "console";


export class ProjectInitializer {
  private SANDBOXPATH: string;
  private fssMethods: FileSystemMethods;
  private projectPath: string

  constructor(project: string) {

    this.SANDBOXPATH = SANDBOX_DIR_PROJECTS;
    this.projectPath = path.join(this.SANDBOXPATH, project);
    const fssMethods = new FileSystemMethods(this.projectPath);
    this.fssMethods = fssMethods;
    if (FileSystemMethods.safeDirParse(this.projectPath)) {
      if (!fs.existsSync(this.SANDBOXPATH)) fs.mkdirSync(this.SANDBOXPATH);
    }
  }

  initializeProject(type: ProjectType): Project {
    if (!this.fssMethods.createDir(this.projectPath)) {
      console.log("Project created at ", this.projectPath);
      return new Project(this.projectPath, {
        path: this.projectPath,
        status: "new",
        timeCreated: new Date()
      })
    }
    console.log("Project already exists at ", this.projectPath);
    return new Project(this.projectPath, {
      path: this.projectPath,
      status: "exists"
    })
  }

  execProjectType(type: ProjectType): boolean {
    const cl = new Cli();
    try {
    } catch (error) {
    }
    return true;
  }














}

console.log("hello from node!");

