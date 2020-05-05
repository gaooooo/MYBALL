/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(users_id_seq::regclass)',
      primaryKey: true
    },
    openid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    real_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_card: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wx_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    star_sign: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    skill_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
