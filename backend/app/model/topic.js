/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, INTEGER, UUID, UUIDV4 } = app.Sequelize;
  const Topic = app.model.define('topic', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: true,
    },
    type: {
      type: INTEGER,
      allowNull: true,
      defaultValue: '0',
    },
    content: {
      type: STRING,
      allowNull: true,
    },
    openid: {
      type: STRING,
      allowNull: true,
    },
    order: {
      type: INTEGER,
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
    tableName: 'topic',
  });
  // 定义关联关系
  Topic.associate = () => {
    // 定义多对多关联话题-球局
    app.model.Topic.belongsToMany(app.model.Users, {
      // 中间表的model
      through: app.model.TopicFocus,
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'listUsers',
      // 是否采用外键进行物理关联
      constraints: false,
      foreignKey: 'topic_id',
      otherKey: 'openid',
    });
    // 定义多对多关联话题-球话
    app.model.Topic.belongsToMany(app.model.Speaking, {
    // 中间表的model
      through: app.model.TopicSpeaking,
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'listSpeaking',
      // 是否采用外键进行物理关联
      constraints: false,
      foreignKey: 'topic_id',
      otherKey: 'speaking_id',
    });

    // Topic与Ball是一对多关系，所以这里使用hasMany()
    app.model.Topic.hasMany(app.model.Ball, { foreignKey: 'topic_id', targetKey: 'id' });
  };

  return Topic;
};
