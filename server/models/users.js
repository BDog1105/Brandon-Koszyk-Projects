const { ObjectId, connect } = require('./mongo');

const data = require("../data/users.json");

const jwt = require('jsonwebtoken');

const COLLECTION_NAME = 'users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

/**
 * @returns {User[]} An array of products.
 */
async function getAll() {
  const col = await getCollection();
  return await col.find({}).toArray();
}

/**
 * @param {number} id - The product's ID.
 */

function get(id) {
  const item = data.users.find(x => x.id === id);
  if(!item) {
    throw new Error('User not found');
  }
  return item
}

function search(query) {
  return data.users.filter(x => {
    return (
      x.firstName.toLowerCase().includes(query.toLowerCase()) ||
      x.lastName.toLowerCase().includes(query.toLowerCase()) ||
      x.email.toLowerCase().includes(query.toLowerCase()) ||
      x.username.toLowerCase().includes(query.toLowerCase()) 
    );
  });
}

/**
 * @param {BaseUser} values - The user to create.
 * @returns {User} The created user.
 */
function create(values) {
  const newItem = {
    id: data.users.length + 1,
    ...values,
  };
 
  data.users.push(newItem);
  return newItem;
}

/**
 * @param {BaseUser} values - The user to create.
 * @returns {User} The created user.
 */
function register(values) {
  // register is like create but with validation
  // and some extra logic

  const exists = data.users.some(x => x.username === values.username);
  if(exists) {
    throw new Error('Username already exists');
  }

  if(values.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // TODO: Make sure user is create with least privileges

  const newItem = {
    id: data.users.length + 1,
    ...values,
  };

  data.users.push(newItem);
  return newItem;

}

/**
 * @param {string} email
 * @param {string} password
 * @returns { Promise< { user: User, token: string}> } The created user.
 */
async function login(email, password) {
  const col = await getCollection();
  const user = await col.findOne({ email: email });
  if (!user) {
    throw {
      message: "User not found",
      status: 404,
    };
  }
  if (user.password !== password) {
    throw {
      message: "Password is incorrect",
      status: 400,
    };
  }
  const BeastlyUser = { ...user, password: undefined };
  const token = await generateJWT(BeastlyUser);
  return { user: BeastlyUser, token: token };
}

/**
 * @param {User} newValues - The user's new data.
 * @returns {User} The updated user.
 */
function update(newValues) {
  const index = data.users.findIndex(p => p.id === newValues.id);
  if(index === -1) {
    throw new Error('User not found');
  }
  data.users[index] = {
    ...data.users[index],
    ...newValues,
  };
  return data.users[index];
}

/**
 * @param {number} id - The user's ID.
 */
function remove(id) {
  const index = data.users.findIndex(x => x.id === id);
  if(index === -1) {
    throw new Error('User not found');
  }
  data.users.splice(index, 1);
}

function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if(err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  })
}

async function seed() {
  const col = await getCollection();

  await col.insertMany(data.users);
}


module.exports = {
  getAll, get, search, create, update, remove, login, register, generateJWT, verifyJWT, seed
};