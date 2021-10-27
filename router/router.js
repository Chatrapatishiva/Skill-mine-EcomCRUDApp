const express = require('express');

const router  = express.Router(); 
const ProductController = require('../controller/controller'); 
router.post('/create', ProductController.createProduct); 
router.get('/', ProductController.getProducts); 
router.post('/update', ProductController.updateProduct); 
router.get('/delete', ProductController.deleteProduct); 
router.post('/search', ProductController.searchProducts); 
// router.get('/', ProductController.homePage); 
router.get('/updateProduct', ProductController.updateProductPage); 

module.exports = router; 
