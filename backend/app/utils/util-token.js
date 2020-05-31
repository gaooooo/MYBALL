
// token工具函数
module.exports = {
  async generatToken(userModel) {
    const { app, config } = this;
    const token = app.jwt.sign({
      id: userModel.id,
      name: userModel.user_name,
      avatar: userModel.avatar,
    }, config.jwt.secret, {
      expiresIn: '1m',
    });
    return token;
  },
};
