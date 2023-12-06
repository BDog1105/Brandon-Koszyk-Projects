const data = require('../data/users.json');
const jwt = require('jsonwebtoken');
const { connect, ObjectId } = require('./mongo');

const COLLECTION_NAME = 'users';

const collection = async () => { //returns the users collection
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
    const coll = await collection();
    const { _id, ...updatedFields } = item;

    const result = await coll.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: updatedFields },
        { returnDocument: 'after' }
    );

    return result;
}

const deleteItem = async (id) => {
    const coll = await collection();
    const result = await coll.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

const search = async (searchTerm, page = 1, pageSize = 30) => {
    const coll = await collection();
    const query = {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } }
        ]
    };
    const items = await coll.find(query).skip((page - 1) * pageSize).limit(pageSize).toArray();
    const total = await coll.countDocuments(query);
    return { items, total };
}

const login = async (email, password) => {
    const coll = await collection();
    const user = await coll.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.password !== password) {
        throw new Error('Invalid password');
    }

    const cleanUser = { ...user, password: undefined };
    const token = await generateTokenAsync(cleanUser, process.env.JWT_SECRET, '1d');

    return { user: cleanUser, token };
}

const generateTokenAsync = (user, secret, expiresIn) => {
    return new Promise( (resolve, reject) => {
        jwt.sign(user, secret, { expiresIn }, (err, token) => {
            if (err) {
                reject(err); //triggers .catch
            } else {
                resolve(token); //triggers .then
            }
        });
    });
}

function verifyTokenAsync(token) {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

const seed = async () => {
    const coll = await collection();
    const result = await coll.insertMany(data.users);
    return result.insertedCount;
}

module.exports = {
    getAll, search, getItemById, addItem, updateItem, deleteItem, seed, login, generateTokenAsync, verifyTokenAsync
};