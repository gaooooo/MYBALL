/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, DOUBLE, STRING, INTEGER, TEXT, UUID, UUIDV4 } = app.Sequelize;
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
    status: {
      type: INTEGER,
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
    price: {
      type: DOUBLE,
      allowNull: false,
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
    create_at: {
      type: DATE,
      allowNull: true,
    },
    update_at: {
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
    app.model.Ball.belongsTo(app.model.Topic, { foreignKey: 'topic_id', targetKey: 'id' });
    // 定义多对多关联球局-用户
    app.model.Ball.belongsToMany(app.model.Users, {
      // 中间表的model
      through: app.model.BallSign,
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'listUser',
      // 是否采用外键进行物理关联
      constraints: false,
      foreignKey: 'ball_id',
      otherKey: 'open_id',
    });
  // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
  };
  return Ball;
};
