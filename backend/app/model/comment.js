/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, INTEGER, JSONB } = app.Sequelize;
  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    p_id: {
      type: INTEGER,
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
    tableName: 'comment',
  });
  // 定义关联关系
  Comment.associate = () => {
    // 与Speaking存在多对一关系，所以使用belongsTo()
    Comment.belongsTo(app.model.Speaking, { foreignKey: 'speaking_id', targetKey: 'id' });

  };
  return Comment;
};
