import { getDB, connectDB, disconnectDB } from './db';

connectDB((err) => {
  if (err != null) {
    console.log(err);
  }
});

const dbInsert = async (location, data) => {
  const _db = getDB();
  const response = await _db.collection(location).insertMany(data);
  return response;
}

const dbList = async (location) => {
  const _db = getDB();
  return await _db.collection(location).find();
}


export default { dbInsert, dbList };
