const mongoose = require("mongoose");

const collectionName = "Products";

const productSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productsModel = mongoose.model(collectionName, productSchema);
module.exports = productsModel;