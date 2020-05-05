/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, INTEGER } = app.Sequelize;
  const UsersFocus = app.model.define('users_focus', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    focus_user_id: {
      type: INTEGER,
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
