/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topic_speaking', {
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    speaking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'topic_speaking'
  });
};
