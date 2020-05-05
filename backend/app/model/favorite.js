/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, INTEGER } = app.Sequelize;
  const Favorite = app.model.define('favorite', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    speaking_id: {
      type: INTEGER,
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
  }, {
    tableName: 'favorite',
  });
    // 定义关联关系
  Favorite.associate = () => {
    // 与Speaking存在多对一关系，所以使用belongsTo()
    Favorite.belongsTo(app.model.Speaking, { foreignKey: 'speaking_id', targetKey: 'id' });

  };
  return Favorite;
};
