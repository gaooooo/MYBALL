/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { DATE, STRING, INTEGER, UUID, UUIDV4 } = app.Sequelize;
  const Users = app.model.define('users', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
    },
    openid: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: STRING,
      allowNull: true,
    },
    nick_name: {
      type: STRING,
      allowNull: true,
    },
    real_name: {
      type: STRING,
      allowNull: true,
    },
    gender: {
      type: INTEGER,
      allowNull: true,
    },
    age: {
      type: INTEGER,
      allowNull: true,
    },
    email: {
      type: STRING,
      allowNull: true,
    },
    avatar: {
      type: STRING,
      allowNull: true,
    },
    mobile_phone: {
      type: STRING,
      allowNull: true,
    },
    id_card: {
      type: STRING,
      allowNull: true,
    },
    job: {
      type: STRING,
      allowNull: true,
    },
    wx_code: {
      type: STRING,
      allowNull: true,
    },
    country: {
      type: STRING,
      allowNull: true,
    },
    constellatory: {
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
    height: {
      type: INTEGER,
      allowNull: true,
    },
    weight: {
      type: INTEGER,
      allowNull: true,
    },
    star_sign: {
      type: INTEGER,
      allowNull: true,
    },
    skill_level: {
      type: INTEGER,
      allowNull: true,
    },
    ball_year: {
      type: INTEGER,
      allowNull: true,
    },
    about: {
      type: STRING,
      allowNull: true,
    },
    password: {
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
    tableName: 'users',
  });
  // 定义关联关系
  Users.associate = () => {
  // 定义多对多关联用户-报名的球局
    Users.belongsToMany(app.model.Ball, {
      // 中间表的model
      through: app.model.BallSign,
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'listBall',
      // 是否采用外键进行物理关联
      constraints: false,
      foreignKey: 'openid',
      otherKey: 'ball_id',
    });
    // // 定义多对多关联用户-关注的话题
    // Users.belongsToMany(app.model.Topic, {
    // // 中间表的model
    //   through: app.model.TopicFocus,
    //   // 进行关联查询时，关联表查出来的数据模型的alias
    //   as: 'listTopicFocus',
    //   // 是否采用外键进行物理关联
    //   constraints: false,
    //   foreignKey: 'openid',
    //   otherKey: 'topic_id',
    // });
    //   // 定义多对多关联用户-关注的用户
    //   Users.belongsToMany(app.model.Users, {
    //   // 中间表的model
    //     through: app.model.UsersFocus,
    //     // 进行关联查询时，关联表查出来的数据模型的alias
    //     as: 'listUsersFocus',

    //     foreignKey: 'user_id',
    //     otherKey: 'focus_user_id',
    //     // 是否采用外键进行物理关联
    //     constraints: false,
    //   });
    //   // 定义多对多关联用户-粉丝用户
    //   Users.belongsToMany(app.model.Users, {
    //     // 中间表的model
    //     through: app.model.UsersFocus,
    //     // 进行关联查询时，关联表查出来的数据模型的alias
    //     as: 'listUsersFans',

  //     foreignKey: 'focus_user_id',
  //     otherKey: 'user_id',
  //     // 是否采用外键进行物理关联
  //     constraints: false,
  //   });
  };

  return Users;
};
