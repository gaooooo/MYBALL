'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Admin = app.model.define('admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openid: {
      type: STRING,
      allowNull: false,
    },
    name: STRING(30),
    password: STRING(64),
    age: INTEGER,
    email: STRING(64),
    phone_number: STRING(64),
    register_type: {
      type: STRING(16),
      default: 'default',
    },
    avatar: {
      type: STRING(128),
      allowNull: true,
    },
    introduction: {
      type: TEXT,
      allowNull: true,
    },
    created_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'admin',
  });

  Admin.associate = () => {
    app.model.Admin.belongsTo(app.model.Role, { as: 'role', foreignKey: 'role_id' });
  };

  return Admin;
};
