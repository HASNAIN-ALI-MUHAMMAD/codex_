export type execCommandOutput = {
  type: "error" | "success" | "failure",
  data: string,
  datetime: number;

}
