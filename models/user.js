module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  User.associate = (models) => {
    User.belongsToMany(models.WhiteboardSession, { through: models.UserSession, foreignKey: 'user_id' });
  };

  return User;
};
