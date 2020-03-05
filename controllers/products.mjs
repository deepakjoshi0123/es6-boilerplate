import product from '../model/products.mjs'
//import { validationResult } = require('express-validator/check')
import logger from 'winston'
/** 
  * @desc this class will hold functions for routes of product controller
  * examples include postAddProducts(), getProducts(), getProducts(), posteditproduct() ,postDelProduct() ,searchProductdetails()
  * @author deepak joshi deepakjoshi0123@gmail.com
  * @required products.mjs
*/
class productController {
    static postAddProducts = async (req, res, next) => {
        logger.info('going in postaddproducts');
        showLog("hello there");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            showLog(errors)
            const error = new Error('validation fail ');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        try {
            const productName = req.body.ProductName;
            const productType = req.body.ProductType;
            const price = req.body.Price;
            showLog(productName, productType, price)
            const result = await product.create({
                ProductName: productName,
                ProductType: productType,
                Price: price
            })

            showLog('product added')
            res.json({ message: "product added succesfully" });
        }
        catch (err) {
            showLog(err);
        }
    }
    //fetching all the products 
    static getProducts = async (req, res, next) => {
        const start = req.params.start;
        const pageSize = 3;
        try {
            const products = await product.findAll({
                offset: 0,
                limit: 10
            })
            res.json({ product: products })
        }
        catch (error) {
            showLog(error);
            next(error);
        }
    }
    //updating products
    static posteditproduct = async (req, res, next) => {
        const ProductName = req.body.ProductName;
        const ProductType = req.body.ProductType;
        const Price = req.body.Price;
        const id = req.params.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            showLog(errors)
            const error = new Error('validation fail ');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        try {
            const Product = await product.findByPk(id);
            showLog(Product)
            Product.ProductName = ProductName;
            Product.ProductType = ProductType;
            Product.Price = Price;
            Product.save();
            showLog('product updated ')
        }
        catch (error) {
            showLog(error);
            next(error);
        }
    }
    //deleting the product 
    static postDelProduct = async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await product.destroy({
                where: { id: id }
            })
            showLog("product deleted");
            res.json({ msg: "prodcut deleted" })
        }
        catch (err) {
            showLog(error);
            next(error);
        }
    }
    //searching the product from name 
    static searchProductdetails = async (req, res, next) => {
        const ProductName = req.params.ProductName;
        try {
            const result = await product.findAll({ where: { ProductName: ProductName } })
                .then(result => {
                    res.json({ user: result })
                })
        }
        catch (err) {
            showLog(error);
            next(error);
        }
    }
}
export default productController;

//https://expressjs.com/en/guide/error-handling.html
//https://expressjs.com/en/guide/error-handling.html
//https://stackify.com/node-js-error-handling/
//https://airbrake.io/blog/nodejs-error-handling/nodejs-error-class-hierarchy