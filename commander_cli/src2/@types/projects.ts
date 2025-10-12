import { type } from "os";

export type ProjectObject = {
  path: string,
  status: "new" | "exists",
  timeCreated?: Date,
}

export type ProjectType = "nodejs" | "vanilla" | "nextjs";


type typeNextJsPrefs = {
  typescript: boolean,
  tailwindcss: boolean,
  linter: "eslint" | "biome" | null
  approuter: boolean,
  src_dir: boolean,
  importalias: string | null
  turbopack: boolean,
  package_manager: string

}
const projectCommands = {
  "nodejs": {
    cmds: ["npm init -y"]
  },
  "vanilla": {
    cmds: []
  },
  "nextjs": {
    cmds: [`npx create-next-app@latest `],
    preferances: []
  }
}



export const getProjectCommands = (type: ProjectType, filename: string, preferances: typeNextJsPrefs) => {
  switch (type) {
    case "nodejs":
      return projectCommands["nodejs"];
    case "vanilla":
      return projectCommands["vanilla"];
    case "nextjs":
      projectCommands["cmds"] += nextjsPrefs(preferances);
      return
  }
}
function nextjsPrefs(preferances: typeNextJsPrefs): string {
  let res: string = "";
  preferances.typescript == true ? res += "--ts" : null;
  preferances.tailwindcss == true ? res += "--tailwind" : null;
  return res;

}
