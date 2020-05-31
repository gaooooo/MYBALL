/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { STRING, DATE, INTEGER, UUID } = app.Sequelize;
  const TopicSpeaking = app.model.define('topic_speaking', {
    topic_id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    speaking_id: {
      type: UUID,
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
    order: {
      type: INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'topic_speaking',
  });
  return TopicSpeaking;
};
