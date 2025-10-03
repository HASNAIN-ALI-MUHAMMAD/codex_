import path from "path"
import os from "os"

export const SANDBOX_DIR = path.join(os.homedir(),".codex")
export const SANDBOX_DIR_PROJECTS = path.join(SANDBOX_DIR,"projects")
export const SANDBOX_DIR_CODERUNNER = path.join(SANDBOX_DIR,".run")

