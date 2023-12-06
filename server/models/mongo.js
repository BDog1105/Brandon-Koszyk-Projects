require("dotenv").config()
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL ?? "";
const DB_NAME = process.env.MONGO_DB_NAME ?? "chopify";

const client = new MongoClient(MONGO_URL);

const connect = async () => { //returns a reference to a MongoDB Database Object
    const database = await client.connect();
    return database.db(DB_NAME);
}

module.exports = {
    connect, ObjectId, DB_NAME
}