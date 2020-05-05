/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, INTEGER } = app.Sequelize;
  const TopicFocus = app.model.define('topic_focus', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    topic_id: {
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
    tableName: 'topic_focus',
  });
  return TopicFocus;
};
