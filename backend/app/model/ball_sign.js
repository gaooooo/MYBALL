/* jshint indent: 2 */
'use strict';
module.exports = app => {
  const { INTEGER, DATE, STRING, UUID } = app.Sequelize;
  const BallSign = app.model.define('ball_sign', {
    ball_id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
    },
    openid: {
      type: STRING,
      allowNull: false,
    },
    sign_status: {
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
    tableName: 'ball_sign',
  });
  return BallSign;
};
