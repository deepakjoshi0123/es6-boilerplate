import express from 'express'
//const { body } = require('express-validator/check')
import productController from '../controllers/products.mjs'
const router = express.Router();

router.get('/products/:start', productController.getProducts)

router.post(
    '/addProduct',
    // [
    //     body('ProductName')
    //         .trim()
    //         .isLength({ min: 3 }),
    //     body('ProductType')
    //         .trim()
    //         .isLength({ min: 4 }),
    //     body('Price')
    //         .isNumeric()
    // ],
    productController.postAddProducts
);

router.delete('/product/:id', productController.postDelProduct)

router.post(
    '/product/:id',
    // [
    //     body('ProductName')
    //         .trim()
    //         .isLength({ min: 3 }),
    //     body('ProductType')
    //         .trim()
    //         .isLength({ min: 4 }),
    //     body('Price')
    //         .isNumeric()
    // ],
    productController.posteditproduct
);

router.get('/product/:ProductName', productController.searchProductdetails)

export default router;