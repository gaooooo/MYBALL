/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, DOUBLE, INTEGER } = app.Sequelize;
  const Speaking = app.model.define('speaking', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    image_url: {
      type: STRING,
      allowNull: true,
    },
    content: {
      type: STRING,
      allowNull: true,
    },
    longitude: {
      type: DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DOUBLE,
      allowNull: true,
    },
    address: {
      type: STRING,
      allowNull: true,
    },
    user_id: {
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
    status: {
      type: INTEGER,
      allowNull: true,
      defaultValue: '1',
    },
  }, {
    tableName: 'speaking',
  });
  // 定义关联关系
  Speaking.associate = () => {

    // Speaking与comments是一对多关系，所以这里使用hasMany()
    Speaking.hasMany(app.model.Comment, { foreignKey: 'speaking_id', targetKey: 'id' });
    Speaking.hasMany(app.model.Favorite, { foreignKey: 'speaking_id', targetKey: 'id' });
  };

  return Speaking;
};
