import { getDB, connectDB, disconnectDB } from './db';
const ObjectID = require('mongodb').ObjectID;

connectDB((err) => {
  if (err != null) {
    console.log(err);
  }
});

const insertMany = async (location, data) => {
  const _db = getDB();
  const response = await _db.collection(location).insertMany(data);
  return response;
}

const insertOne = async (location, data) => {
   const _db = getDB();
  const response = await _db.collection(location).insert(data);
  return response;
}


const dbList = async (location) => {
  const _db = getDB();
  return await _db.collection(location).find().toArray();
}

const removeDocument = async (location, id) => {
  const _db = getDB();
  const response = await _db.collection(location).deleteOne({ _id: ObjectID(id) });
}


export default { insertMany, dbList, insertOne, removeDocument };
