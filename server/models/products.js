const data = require('../data/products_sports.json');
const { connect, ObjectId } = require('./mongo');

const COLLECTION_NAME = 'products';

const collection = async () => { //returns the products collection
    const database = await connect();
    return database.collection(COLLECTION_NAME);
}

const getAll = async (page=1, pageSize=30) => {
    const coll = await collection();
    const items = await coll
        .find()
        .skip((page-1) * pageSize)
        .limit(pageSize)
        .toArray();
    const total = await coll.countDocuments();
    return { items, total };
}

const getItemById = async (id) => {
    const coll = await collection();
    const item = await coll
        .findOne({_id: new ObjectId(id)});
    return item;
}  

const addItem = async (item) => {
    const coll = await collection();
    const result = await coll.insertOne(item)
    item._id = result.insertedId;
    return item;
}

const updateItem = async (item) => {
    const col = await collection();
    const { _id, ...updatedFields } = item;

    const result = await col.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: updatedFields },
        { returnDocument: 'after' }
    );

    return result;
}

const deleteItem = async (id) => {
    const col = await collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

const search = async (searchTerm, page = 1, pageSize = 30) => {
    const coll = await collection();
    const query = {
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { brand: { $regex: searchTerm, $options: 'i' } }
        ]
    };
    const items = await coll.find(query).skip((page - 1) * pageSize).limit(pageSize).toArray();
    const total = await coll.countDocuments(query);
    return { items, total };
}

async function seed() {
    const coll = await collection();
    const result = await coll.insertMany(data.products);
    return result.insertedCount;
}

module.exports = {
    getAll, search, getItemById, addItem, updateItem, deleteItem, seed,
};