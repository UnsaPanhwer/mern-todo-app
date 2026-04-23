import { MongoClient } from "mongodb";


const url = "mongodb://localhost:27017";
const dbName = "node-project";

export const collectionName = "Todo";

const client = new MongoClient(url);

export const connection = async () => {
    await client.connect(); 
    return client.db(dbName); 
};