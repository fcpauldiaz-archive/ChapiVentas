import { getDB, connectDB, disconnectDB } from './db';

connectDB((err) => { console.log(err); });

const dbInsert = async (data) => {
  const _db = getDB();
  const response = await _db.collection('products').insertMany(data);
  return response;
}


export default { dbInsert };
