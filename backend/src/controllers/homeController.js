const db = require('../models');
const Home = db.Home;
const User = db.User;

exports.findByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findByPk(userId, {
      include: [{ model: Home, through: { attributes: [] } }],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.Homes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving homes by user', error: error.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const { homeId, userIds } = req.body;
    const home = await Home.findByPk(homeId);
    if (!home) {
      return res.status(404).json({ message: 'Home not found' });
    }
    await home.setUsers(userIds);
    const updatedHome = await Home.findByPk(homeId, {
      include: [{ model: User, through: { attributes: [] } }],
    });
    res.json(updatedHome);
  } catch (error) {
    res.status(500).json({ message: 'Error updating home users', error: error.message });
  }
};