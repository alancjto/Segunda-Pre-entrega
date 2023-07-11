const { Router } = require("express");

const productsModel = require("../model/Products.model");
const productsData = require("../data/products.js");

const router = Router();

router.get("/insertion", async (req, res) => {
  try {
    let result = await productsModel.insertMany(productsData);

    return res.json({
      message: `bulk insertion successfully`,
      products: result,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:12 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/category", async (req, res) => {
  try {
    
    const productsByGrade = await productsModel.aggregate([
      {
        $group: { _id: "$grade", products: { $push: "$$ROOT" } },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const prodcutsByGradeV2 = await productsModel.aggregate([
      { $sort: { grade: -1 } },
      { $group: { _id: "$grade", products: { $push: "$$ROOT" } } },
    ]);

    // AGRUPAR ESTUDIANTES POR GRUPO
    const prodcutsInGroups = await productsModel.aggregate([
      { $group: { _id: "$group", products: { $push: "$$ROOT" } } },
    ]);

    return res.json({
      message: `queries de agrupacion`,
      productsByGrade,
      productsByGradeV2,
      productsInGroups,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:38 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/promedio/grupo", async (req, res) => {
  try {
    const group = req.query.group ?? "1B";
 
    const productsAverage1B = await productsModel.aggregate([
      { $match: { group: `${group}` } },
      { $group: { _id: "1B", promedio: { $avg: "$grade" } } },
    ]);

    const productsAverage1A = await productsModel.aggregate([
      { $match: { group: "1A" } },
      { $group: { _id: "1A", promedio: { $avg: "$grade" } } },
    ]);

    return res.json({
      message: `average for students in class 1A and 1B`,
      studentAverage1B,
      productsAverage1A,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: prodcuts.routes.js:65 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/price/general", async (req, res) => {
  try {
    
    const generalAverage = await prodcutsModel.aggregate([
      { $group: { _id: "product", promedio: { $avg: "$grade" } } },
    ]);

    return res.json({
      message: `general average`,
      generalAverage,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:87 ~ router.get ~ error:",
      error
    );
  }
});



module.exports = router;