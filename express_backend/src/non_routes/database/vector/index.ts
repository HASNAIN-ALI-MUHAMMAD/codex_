import { MongoClient,Db,Collection,Document} from "mongodb";
import { env } from "../../_configs/env.js";

class MongoVectorClient{
      private client:MongoClient;
      private db:Db;
      private collection:Collection<Document>;

      constructor(client:MongoClient,db:Db,collection:Collection<Document>){
            this.client = client;
            this.db = db;
            this.collection = collection;
      }

      static async connect(collectionName:string):Promise<MongoVectorClient>{
            const mongouri = env.getValue("MONGO_URI");
            const mongodb = env.getValue("MONGO_DB");
            try {
                  const mongoClient:MongoClient = new MongoClient(mongouri);
                  await mongoClient.connect();
                  console.log("Connected to MongoDB");
                  const db = mongoClient.db(mongodb);
                  const collection = db.collection(collectionName);
                  return new MongoVectorClient(mongoClient,db,collection);
            } catch (err) {
                  throw new Error("Error: type(mongoose),\nFailed to connect to MongoDB: " + err);
                  
            }

      }

      async close():Promise<void>{
            await this.client.close();
            console.log("MongoDB connection closed");
      }

      async getCollection(){
            return await this.collection.namespace
      }


}

const mongoVectorClient = await MongoVectorClient.connect("vectors");
console.log(await mongoVectorClient.getCollection());
await mongoVectorClient.close();