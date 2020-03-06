import { valEmail } from '../util/utilFunctions.mjs'
export default (req, res, next) => {
    const email = req.body.email;
    const productName = req.body.ProductName;
    const productType = req.body.ProductType;
    const price = req.body.Price;
    const password = req.body.password;
    const country = req.body.country;
    const fullName = req.body.fullName;

    console.log(email, productName, productType, price, password, country, fullName);
    // if (price === undefined) {
    //     const error = new Error('validation failed--------');
    //     throw error;
    // }
    console.log('going inside if block')
    if (email != undefined) {

        if (valEmail(email) === true) {
            const error = new Error('validation failed--------');
            throw error;
        }
    }
    next();
}  
