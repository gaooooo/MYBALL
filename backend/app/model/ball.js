/* jshint indent: 2 */
'use strict';

const { uuid } = require('uuidv4');
module.exports = app => {
  const { DATE, DOUBLE, STRING, INTEGER, TEXT, UUID, UUIDV4, ARRAY } = app.Sequelize;
  const Ball = app.model.define('ball', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
      primaryKey: true,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    image_url: {
      type: STRING,
      allowNull: true,
    },
    ball_type: {
      type: INTEGER,
      allowNull: true,
      defaultValue: '1',
    },
    address: {
      type: STRING,
      allowNull: true,
    },
    country: {
      type: STRING,
      allowNull: true,
    },
    province: {
      type: STRING,
      allowNull: true,
    },
    city: {
      type: STRING,
      allowNull: true,
    },
    status: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    longitude: {
      type: DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DOUBLE,
      allowNull: true,
    },
    start_time: {
      type: DATE,
      allowNull: true,
    },
    end_time: {
      type: DATE,
      allowNull: true,
    },
    share_type: {
      type: INTEGER,
      allowNull: true,
    },
    is_limit_num: {
      type: INTEGER,
      allowNull: true,
    },
    people_num: {
      type: INTEGER,
      allowNull: true,
    },
    price: {
      type: DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    services: {
      type: ARRAY(app.Sequelize.INTEGER),
      allowNull: true,
    },
    content: {
      type: TEXT,
      allowNull: true,
    },
    openid: {
      type: STRING,
      allowNull: false,
    },
    qrcode: {
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
    topic_id: {
      type: UUID,
      allowNull: false,
    },
  }, {
    tableName: 'ball',
  });

  // 定义关联关系
  Ball.associate = () => {

    // 与TopPic存在多对一关系，所以使用belongsTo()
    app.model.Ball.belongsTo(app.model.Topic, { as: 'modelTopic', foreignKey: 'topic_id', targetKey: 'id' });
    // 定义多对多关联球局-用户
    app.model.Ball.belongsToMany(app.model.Users, {
      // 中间表的model
      through: app.model.BallSign,
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'listUser',
      // 是否采用外键进行物理关联
      constraints: false,
      foreignKey: 'ball_id',
      otherKey: 'openid',
    });
  // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
  };
  Ball.beforeCreate((ball, _) => {
    return ball.id = uuid();
  });

  return Ball;
};
