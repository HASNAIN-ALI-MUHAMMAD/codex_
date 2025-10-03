import pg, { Pool,Client } from "pg"
import { env } from "../../_configs/env.js";

interface DBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

class Postgres{

      private static instance:Postgres;
      private pool_pg:pg.Pool

      constructor(cnfg:DBConfig){
            this.pool_pg= new pg.Pool(cnfg)
            this.pool_pg.on("connect",(e)=>{
                  console.log(`Postgres pool at ${cnfg.host}:${cnfg.port} connected.`)
            })

            this.pool_pg.on("error",(e)=>{
                  console.log(`Error: ${e}`)
            })
      }

      static async getInstance():Promise<Postgres>{
            const config:DBConfig = {
                  host: env.getValue("PG_HOST")||"localhost",
                  port:Number.parseInt(env.getValue("PG_PORT"))|| 1000,
                  user:env.getValue("PG_USER"),
                  password: env.getValue("PG_PASSWORD"),
                  database: env.getValue("PG_DATABASE")
            };
            if(!this.instance){
                  if(!config) throw new Error("Error: Config for postgres pooling not provided.")
                  this.instance = new Postgres(config)
                  await this.instance.fss_CREATETABLE()
                  await this.instance.projects_CREATETABLE()
                  return this.instance
            }
            return this.instance
      }

      //private methods
      private async singleQuery(query:string){
            try {
                  const res = await this.pool_pg.query(query)
                  return res                  
            } catch (error) {
                  throw error
            }
      }

      /// table projects methods
      // 1.create table
      // 2. query table
      // 3. update table

      private async projects_CREATETABLE(){

            try {
                  const query:string = `
                  CREATE EXTENSION IF NOT EXISTS pgcrypto;
                  CREATE TABLE IF NOT EXISTS projects(
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name TEXT NOT NULL,
                        path TEXT NOT NULL,
                        type TEXT NOT NULL,
                        created_at TIMESTAMPTZ DEFAULT NOW(),
                        updated_at TIMESTAMPTZ DEFAULT NOW()
                  )`;
                  const res = await this.singleQuery(query)
                  return res
            } catch (error) {
                  throw new Error("Error: type (postgres)\n",error)
            }
      }

      /// table fss methods
      // 1.create table
      // 2. query table
      // 3. update table

      private async fss_CREATETABLE(){
            try {
                  const query = `
                  CREATE TABLE IF NOT EXISTS filesystem (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                        structure JSONB NOT NULL,
                        created_at TIMESTAMPTZ DEFAULT NOW(),
                        updated_at TIMESTAMPTZ DEFAULT NOW()
                  );`
                  const res = await this.singleQuery(query)
                  return res
            } catch (error) {
                  throw new Error("Error: type (postgres)\n",error)      
            }
      }

      async performQueryTransactions<T>(fn:(client:pg.PoolClient)=>Promise<T>):Promise<T>{
            const client:pg.PoolClient = await this.pool_pg.connect()
            try {
                  await client.query("BEGIN")
                  const res = await fn(client)
                  await client.query("COMMIT")
                  return res
            } catch (error) {
                  await client.query('ROLLBACK');
                  throw error;
            }
            finally{
                  await client.release()
                  return
            }
      }


      async closePool():Promise<void>{
            await this.pool_pg.end()
            console.log("Pool closed!")
      }


      async listtables(){
            const res = await this.singleQuery(`
            SELECT schemaname, tablename
            FROM pg_tables
            WHERE schemaname NOT IN ('pg_catalog', 'information_schema');`)
            console.log(res.rows)
      }
}

const pg_ins = await Postgres.getInstance()
await pg_ins.listtables()

const res = await pg_ins.performQueryTransactions(async (client)=>{
      // await client.query("INSERT INTO * FROM projects")
      // await client.query("SELECT * FROM filesystem")
      // await client.query("SELECT version()")
})
console.log(res)

await pg_ins.closePool()
