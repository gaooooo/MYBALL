/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { STRING, DATE, UUID } = app.Sequelize;
  const TopicFocus = app.model.define('topic_focus', {
    openid: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    topic_id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
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
    tableName: 'topic_focus',
  });
  return TopicFocus;
};
