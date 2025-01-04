module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define('UserSession', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'whiteboardSessions',
        key: 'id',
      },
    },
  }, {
    tableName: 'user_sessions',
    timestamps: true,
  });

  return UserSession;
};
