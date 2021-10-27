const MongoClient = require("mongodb").MongoClient;
require("dotenv").config(); //to access .env file
var productsCollection;
var db;
//Connect To MongoDB
const connectMongoDB = () =>
  MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to Database");
      db = client.db("skill-mine");
      productsCollection = db.collection("products");
    })
    .catch((error) => console.error(error));

//insert One
const insertOne = (obj) =>
  productsCollection.insertOne(obj).then((result) => result);

//Read
const readData = (obj, options) =>
  productsCollection
    .find(obj, options)
    .toArray()
    .then((result) =>  result);

const readDataWithTotal = (obj, options) =>
  productsCollection.count().then((result) =>  result);

//Update
const updateProductData = (obj) =>
  productsCollection
    .findOneAndUpdate(
      {category: obj.category},
      {
        $set: {
          category: obj.category,
          brand: obj.brand,
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => result);

  //Delete
const DeleteProductData = (obj) => 
productsCollection
.deleteOne(
  { brand: obj.brand }
).then((result) => result);

module.exports = { connectMongoDB, insertOne, readData, updateProductData, DeleteProductData, readDataWithTotal };
