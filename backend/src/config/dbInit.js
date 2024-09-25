const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.PORT, // Ensure PORT is used if needed
});

async function initDatabase() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Import models
    const User = require('../models/user')(sequelize, Sequelize);
    const Home = require('../models/home')(sequelize, Sequelize);

    // Define relationships between models
    User.belongsToMany(Home, { through: 'UserHomes' });
    Home.belongsToMany(User, { through: 'UserHomes' });

    // Sync models and create tables
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');

    // Exit process after successful operation
    process.exit(0);
  } catch (error) {
    // Handle connection error
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

initDatabase();
