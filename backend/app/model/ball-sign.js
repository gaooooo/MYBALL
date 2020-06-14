/* jshint indent: 2 */
'use strict';
const { uuid } = require('uuidv4');
module.exports = app => {
  const { INTEGER, DATE, STRING, UUID, UUIDV4 } = app.Sequelize;
  const BallSign = app.model.define('ball_sign', {
    id: {
      type: UUID,
      defauleValue: UUIDV4,
      primaryKey: true,
    },
    ball_id: {
      type: UUID,
      allowNull: false,
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
  BallSign.beforeCreate((ball_sign, _) => {
    return ball_sign.id = uuid();
  });

  return BallSign;
};
