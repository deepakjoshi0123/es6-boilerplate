import dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config();
const sequelize = new Sequelize('boilerplate', 'root', 'netzwelt', {
    dialect: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.DB_PORT
});
export default sequelize;

//process.env.SCHEMA, process.env.USERNAME, process.env.PASSWORD
