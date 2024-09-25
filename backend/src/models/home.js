module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define('Home', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Add other relevant fields here
  });

  return Home;
};