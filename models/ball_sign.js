/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ball_sign', {
    ball_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sign_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'ball_sign'
  });
};
