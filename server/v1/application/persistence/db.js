
 const MongoClient = require('mongodb').MongoClient;
 import config from '../../../../config/config';
 const uri = config.mongoUri;
 let _db;

 const connectDB = async (callback) => {
  try {
    MongoClient.connect(uri, (err, db) => {
      _db = db
      return callback(err)
    });
  } catch (e) {
    throw e
  }
};

const getDB = () => _db;

const disconnectDB = () => _db.close();

export default {
  connectDB, getDB, disconnectDB
};
