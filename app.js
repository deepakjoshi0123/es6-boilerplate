import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import authRoutes from './Routes/auth.mjs'
import userRoutes from './Routes/products.mjs'
import sequelize from './util/database.mjs'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

global.showLog = function (logData) {
    console.log(logData)
}

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use('/', authRoutes);
app.use('/prod', userRoutes);

//global error handler
app.use((error, req, res, next) => {
    showLog(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})
async function test() {

    try {
        let data = await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test();
app.listen(process.env.PORT);