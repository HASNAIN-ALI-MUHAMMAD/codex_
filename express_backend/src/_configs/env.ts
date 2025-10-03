import dotenv from "dotenv"

class Env{
      private is_loaded:boolean = false;
      constructor(){
            if(!this.is_loaded){
                  dotenv.config({path:"/home/hasnain/D/code/js/codex/codex_/express_backend/.env","quiet":true})
                  this.is_loaded = true
            }
      }     

      getValue(key:string){
            return process.env[key]
      }

}
 
export const env = new Env()