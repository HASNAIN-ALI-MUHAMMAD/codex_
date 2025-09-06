export type READDIRFILE = {
    type:"file",
    name:string,
    absPath:string,
    relPath:string,
    size:number
}
export type READDIRDIR = {
    type:"dir",
    name:string,
    absPath:string,
    relPath:string,
    children?:READDIR[]
}
export type READDIR = READDIRFILE | READDIRDIR


export type FILESDATATYPE = {
  absPath:string,
  data:string
}