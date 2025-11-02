export type ProjectObject = {
  path: string,
  status: "new" | "exists",
  timeCreated?: Date,
}

export type ProjectType = "nodejs" | "vanilla" | "nextjs";


const projectCommands = {
  "nodejs": {
    cmds: ["npm init -y"]
  },
  "vanilla": {
    cmds: []
  },
  // "nextjs": {
  //   cmds: `npx create-next-app@latest `
  // }
} as const as {}



export const getProjectCommands = (type: ProjectType, filename?: string) => {
  switch (typeof projectCommands[type] !== "undefined" ? type : null) {
    case "nodejs":
      return projectCommands["nodejs"];
    case "vanilla":
      return projectCommands["vanilla"];
    // case "nextjs":
    //   const str = `${projectCommands["nextjs"].cmds} ${nextjsPrefs(preferances, filename)}`;
    //   return str
  }
}

// function nextjsPrefs(preferances: typeNextJsPrefs, filename: string): string {
//   let res: string = `${filename} `;
//   preferances.typescript ? res += "--ts " : null;
//   preferances.tailwindcss ? res += "--tailwind " : null;
//   preferances.approuter ? res += "--app " : null;
//   preferances.src_dir ? res += "--src-dir " : null;
//   preferances.importalias !== null ? res += `--import-alias ${preferances.importalias} ` : null;
//   preferances.turbopack ? res += "--turbopack " : null;
//   preferances.package_manager !== null ? res += `--use-${preferances.package_manager.trim()} ` : null;
//   preferances.linter !== null ? res += `--${preferances.linter.trim()} ` : null;
//   return res;
// }



// type typeNextJsPrefs = {
//   typescript: boolean,
//   tailwindcss: boolean,
//   linter: "eslint" | "biome" | null
//   approuter: boolean,
//   src_dir: boolean,
//   importalias: string | null
//   turbopack: boolean,
//   package_manager: string | null
// }

