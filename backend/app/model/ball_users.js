/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  const BallUsers = app.model.define('ball_users', {
    ball_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sign_status: {
      type: INTEGER,
      allowNull: true,
    },
    create_at: {
      type: DATE,
      allowNull: true,
    },
    update_at: {
      type: DATE,
      allowNull: true,
    },
  }, {
    tableName: 'ball_users',
  });
  return BallUsers;
};
