//import { validationResult } from 'express-validator'
import user from '../model/user.mjs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import logger from '../logger.mjs'
import myconst from '../constant/constant.mjs'
import dotenv from 'dotenv'

dotenv.config();

//sends user profile after matching the email 

// function response(data) {
//     res.json(
//         {
//             "success": false,
//             "message": data.message,
//             "error_code": data.code,
//             "data": data.content
//         }
//     )
// }

class userController {
    static getProfile = async (req, res, next) => {
        const email = req.body.email;
        try {
            const user1 = await user.findOne({ where: { email: email } })
            if (user1) {
                // Response(userData);
                res.json({ user: userProfile });
            }
        }
        catch (err) {
            showLog(err)
        }
    }
    // handles signup when users creates new profile  
    static signup = async (req, res, next) => {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.error(myconst.error);
            const error = new Error(myconst.error);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        try {
            const email = req.body.email;
            const password = req.body.password;
            const country = req.body.country;
            const fullName = req.body.fullName;
            const hassedPw = await bcrypt.hash(password, 12);
            logger.info('going to insert user in the database');
            const user1 = await user.create({
                email: email,
                password: hassedPw,
                country: country,
                fullName: fullName
            })
            if (user1) {
                logger.info('user inserted successfully')
                res.json({ message: "user added successfully" })
            }
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 422;
            }
            next(error);
        }
    }
    //handles login and creates token for upcoming user 
    static login = async (req, res, next) => {

        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;
        logger.info('entry to login function ')
        try {
            const user1 = await user.findOne({ where: { email: email } });

            if (!user1) {
                const error = new Error('A user with this email not found');
                logger.error('User with this email not found');
                error.statusCode = 401;
                throw error;
            }
            const isEqual = await bcrypt.compare(password, user1.password);
            if (!isEqual) {
                const error = new Error('wrong password');
                logger.error('WRONG PASSWORD INSERTED');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: user1.email,
                    userId: user1.id
                },
                process.env.TOKEN_KEY,
                { expiresIn: '5h' } // .env not working for this 
            );
            res.status(200).json({ token: token, userId: user1.id });
            logger.info('token and id send as response');
        }
        catch (error) {
            showLog(error);
            next(error);
        }

    };
}
export default userController;