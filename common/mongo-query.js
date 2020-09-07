const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

exports.LOCAL = `mongodb://${mongoUser}:${mongoPass}@localhost:27017`;
console.log(this.LOCAL);

exports.MongoClient = MongoClient;
