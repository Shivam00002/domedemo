const db = require('../models');
const User = db.User;
const Home = db.Home;

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

exports.findByHome = async (req, res) => {
  try {
    const { homeId } = req.query;
    const home = await Home.findByPk(homeId, {
      include: [{ model: User, through: { attributes: [] } }],
    });
    if (!home) {
      return res.status(404).json({ message: 'Home not found' });
    }
    res.json(home.Users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users by home', error: error.message });
  }
};