import express from 'express'
//import { body } from 'express-validator'
import authControl from '../controllers/users.mjs'
//import user from '../model/user.mjs'
const router = express.Router();

router.post(
    '/signup',
    // [
    //     body('email')
    //         .isEmail()
    //         .withMessage('please enter a valid email ')
    //         .custom((value, { req }) => {
    //             return user.findOne({ where: { email: value } }).then(userDoc => {
    //                 if (userDoc) {
    //                     return Promise.reject('E-MAIL ALREADY EXISTS')
    //                 }
    //             });
    //         })
    //         .normalizeEmail(),
    //     body('password')
    //         .trim()
    //         .isLength({ min: 5 }),
    //     body('fullName')
    //         .trim()
    //         .not()
    //         .isEmpty()
    // ],
    authControl.signup
);
router.post('/login', authControl.login);

router.post('/profile', authControl.getProfile);

export default router;