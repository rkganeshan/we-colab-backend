module.exports = (sequelize, DataTypes) => {
  const WhiteboardSession = sequelize.define('WhiteboardSession', {
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    drawData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  WhiteboardSession.associate = (models) => {
    WhiteboardSession.belongsToMany(models.User, { through: models.UserSession, foreignKey: 'session_id' });
  };

  return WhiteboardSession;
};
