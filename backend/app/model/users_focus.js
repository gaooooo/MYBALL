/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { STRING, DATE } = app.Sequelize;
  const UsersFocus = app.model.define('users_focus', {
    openid: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    focus_open_id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
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
    tableName: 'users_focus',
  });
  return UsersFocus;
};
