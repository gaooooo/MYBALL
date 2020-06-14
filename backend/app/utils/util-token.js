'use strict';
// token工具函数
module.exports = {
  async generatToken(userModel) {
    const { app, config } = this;
    const token = app.jwt.sign({
      openid: userModel.openid,
      id: userModel.id,
      user_name: userModel.user_name,
      nick_name: userModel.nickName,
      real_name: userModel.real_name,
      gender: userModel.gender,
      age: userModel.age,
      email: userModel.email,
      avatar: userModel.avatar,
      mobile_phone: userModel.mobile_phone,
      id_card: userModel.id_card,
      job: userModel.job,
      wx_code: userModel.wx_code,
      constellatory: userModel.constellatory,
      country: userModel.country,
      province: userModel.province,
      city: userModel.city,
      height: userModel.height,
      weight: userModel.weight,
      star_sign: userModel.star_sign,
      skill_level: userModel.skill_level,
      ball_year: userModel.ball_year,
      about: userModel.about,
      password: userModel.password,
    }, config.jwt.secret, {
      expiresIn: '1m',
    });
    return token;
  },
};
