const { response } = require("express");
const mongo = require("../mongo/mongo");

const homePage = (req, res, next) => {
  res.status(200).sendFile("index.html", { root: "./views" });
};

const createProduct = (req, res, next) => {
  console.log(res.body);
  if (req.body.brand != "") {
    mongo
      .insertOne(req.body)
      .then((response) => {
        res.redirect("/");
      })
      .catch((error) => console.log(error));
  } else {
    console.log("Brand name is empty!");
  }
};

const getProducts = (req, res, next) => {
  mongo
    .readData({}) //{limit:10, skip:0}
    .then(async (response) => {
      let object = {
        categories: [],
        brands: [],
        totalCount: 0,
      };
      response.forEach((element) => {
        if (!object.categories.includes(element.category)) {
          object.categories.push(element.category);
        }
        object.brands.push({
          category: element.category,
          brand: element.brand,
        });
      });
      await mongo.readDataWithTotal({}).then((total) => {
        object.totalCount = total;
      });
      console.log(object);
      res.status(200).render("index.ejs", { data: object });
    })
    .catch((error) => console.log(error));
};

const updateProduct = (req, res, next) => {
  mongo
    .updateProductData(req.body)
    .then((response) => {
      console.log(response);
      res.send({ message: response });
    })
    .catch((error) => console.log(error));
};

const deleteProduct = (req, res, next) => {
  console.log(req.query);
  mongo
    .DeleteProductData({ brand: req.query.brand })
    .then((response) => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};

const searchProducts = (req, res, next) => {
  console.log(req.body);

  if (req.body.category == "All") {
    delete req.body.category;
    if (req.body.brand == "") {
      res.redirect("/");
      console.log("Empty Search Query");
      return;
    }
  }
  if (req.body.brand == "") {
    delete req.body.brand;
  }
  console.log(req.body);

  mongo
    .readData(req.body, { limit: 10, skip: 0 })
    .then((response) => {
      let object = {
        categories: [],
        brands: [],
      };
      response.forEach((element) => {
        if (!object.categories.includes(element.category)) {
          object.categories.push(element.category);
        }
        object.brands.push({
          category: element.category,
          brand: element.brand,
        });
      });
      console.log(object);
      res.status(200).render("index.ejs", { data: object });
      // res.send({ message: reponse });
    })
    .catch((error) => console.log(error));
};

const updateProductPage = (req, res, next) => {
  console.log(req.query)
  res.status(200).render("update.ejs", {data: req.query });
}
module.exports = {
  getProducts,
  createProduct,
  homePage,
  updateProduct,
  deleteProduct,
  searchProducts,
  updateProductPage
};
