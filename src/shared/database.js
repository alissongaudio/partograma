'use strict';

const MongoClient = require('mongodb').MongoClient;

//const MONGODB_URL = process.env.MONGODB_URL
//const POOL_SIZE = process.env.POOL_SIZE ? Number(process.env.POOL_SIZE) : 20;
const POOL_SIZE = 20;

let connection = null;

/**
 * Singleton pattern to get mongodb connection
 * @returns {Promise<MongoClient>}
 */
const getConnection = async () => {
  if(connection) return connection;

  connection = await MongoClient.connect(MONGODB_URL);

  return connection;
}

module.exports = getConnection;