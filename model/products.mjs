import Sequelize from 'sequelize'
import sequelize from '../util/database.mjs'
const product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ProductName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ProductType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Price: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default product;
