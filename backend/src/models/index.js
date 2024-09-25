const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Home = require('./home')(sequelize, Sequelize);


db.User.belongsToMany(db.Home, { through: 'UserHomes' });
db.Home.belongsToMany(db.User, { through: 'UserHomes' });

module.exports = db;