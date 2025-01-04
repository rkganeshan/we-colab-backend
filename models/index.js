const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const WhiteboardSession = require('./whiteboardSession')(sequelize, Sequelize);
const UserSession = require('./userSession')(sequelize, Sequelize);

// Define associations
User.belongsToMany(WhiteboardSession, { through: UserSession, foreignKey: 'user_id' });
WhiteboardSession.belongsToMany(User, { through: UserSession, foreignKey: 'session_id' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  WhiteboardSession,
  UserSession
};
