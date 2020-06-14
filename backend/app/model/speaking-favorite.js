/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, UUID, UUIDV4 } = app.Sequelize;
  const SpeakingFavorite = app.model.define('speaking_favorite', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
      primaryKey: true,
    },
    speaking_id: {
      type: UUID,
      allowNull: false,
    },
    openid: {
      type: STRING,
      allowNull: false,
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
  }, {
    tableName: 'speaking_favorite',
  });
    // 定义关联关系
  SpeakingFavorite.associate = () => {
    // 与Speaking存在多对一关系，所以使用belongsTo()
    SpeakingFavorite.belongsTo(app.model.Speaking, { foreignKey: 'speaking_id', targetKey: 'id' });

  };
  return SpeakingFavorite;
};
