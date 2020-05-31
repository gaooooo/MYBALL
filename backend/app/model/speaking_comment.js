/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, JSONB, UUID, UUIDV4 } = app.Sequelize;
  const SpeakingComment = app.model.define('speaking_comment', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
      primaryKey: true,
    },
    p_id: {
      type: STRING,
      allowNull: true,
      defaultValue: '0',
    },
    content: {
      type: STRING,
      allowNull: true,
    },
    images: {
      type: JSONB,
      allowNull: true,
    },
    speaking_id: {
      type: UUID,
      allowNull: true,
    },
    openid: {
      type: STRING,
      allowNull: true,
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
    tableName: 'speaking_comment',
  });
  // 定义关联关系
  SpeakingComment.associate = () => {
    // 与Speaking存在多对一关系，所以使用belongsTo()
    SpeakingComment.belongsTo(app.model.Speaking, { foreignKey: 'speaking_id', targetKey: 'id' });

  };
  return SpeakingComment;
};
