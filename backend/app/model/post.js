'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Post = app.model.define('post', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    title: STRING(30),
    content: STRING(255),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'post',
  });

  Post.associate = function() {
    app.model.Post.belongsTo(app.model.Admin, { as: 'admin', foreignKey: 'user_id' });
  };

  Post.findByIdWithAdmin = async function(id, userId) {
    return await this.findOne({
      where: { id, user_id: userId },
    });
  };

  return Post;
};
