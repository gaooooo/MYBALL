/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, DOUBLE, INTEGER, UUID, UUIDV4 } = app.Sequelize;
  const Speaking = app.model.define('speaking', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
      primaryKey: true,
    },
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
    openid: {
      type: String,
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
    Speaking.hasMany(app.model.SpeakingComment, { foreignKey: 'speaking_id', targetKey: 'id' });
    Speaking.hasMany(app.model.SpeakingFavorite, { foreignKey: 'speaking_id', targetKey: 'id' });
  };

  return Speaking;
};
