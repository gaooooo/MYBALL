'use strict';

const Controller = require('egg').Controller;
const tokenUtil = require('../utils/util-token');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async getAppConfig() {
    const { ctx, app } = this;
    ctx.body = app.config;
  }

  async refreshToken() {
    const { ctx, app, service } = this;
    const { id } = ctx.query;
    const userModel = await service.users.find(id);

    const token = await tokenUtil.generatToken.call(this, userModel);
    try {

      await app.redis.set(`token_${userModel.id}`, token);
      ctx.body = ctx.helper.JSONResponse({
        code: 0,
        message: 'Get token success',
        data: { access_token: token },
      });
    } catch (e) {
      throw e;
    }
  }
  async loginout() {
    const { ctx, app } = this;
    // 移除redis
    // await app.redis(`token_${user.id}`, token);
  }
  async loginByMini() {
    const { ctx, app, service } = this;
    const userData = ctx.request.body;
    const { code } = ctx.request.body;
    const res = await service.mp.login(code);
    // session_key: '0XdJnk4go2n0RVjOxmTXsw==',
    // expires_in: 7200,
    // openid: 'o9OwI0fnvhCpLb8JGcztvbC37sxQ'
    if (!res.openid) {
      console.error('不存在的openid');
      ctx.body = ctx.helper.JSONResponse({
        code: 500,
        message: '微信认证失败',
      });
    }
    let userModel = await service.users.findByOpenId(res.openid);
    if (!userModel) {
      userModel = {
        openid: res.openid,
        user_name: 'BALLER_123', // TODO 随机数
        nick_name: userData.nickName,
        real_name: '',
        gender: userData.gender,
        age: 0,
        email: '',
        avatar: userData.avatarUrl,
        mobile_phone: '',
        id_card: '',
        job: '',
        wx_code: '',
        constellatory: '',
        country: userData.country,
        province: userData.province,
        city: userData.city,
        // height: 0,
        // weight: 0,
        // star_sign: 0,
        // skill_level: 0,
        // ball_year: 0,
        about: '',
        password: ctx.helper.encryptPwd('123456'),
      };
      userModel = await service.users.create(userModel);
    }
    const token = await tokenUtil.generatToken.call(this, userModel);
    try {
      await app.redis.set(`token_${userModel.id}`, token);
      await app.redis.set(`openid_${userModel.id}`, res.openid);
      // const { openid, ...user } = userModel;
      ctx.body = ctx.helper.JSONResponse({
        code: 0,
        message: 'Get token success',
        data: {
          token,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async login() {
    const { ctx, app, config } = this;
    const { service, helper } = ctx;

    const { username, password } = ctx.request.body;
    // admin表改为users表，给user一个password字段，如果user表不存在，则创建一条用户记录初始化密码，并且完成登录
    // 如果存在users表，就返回用户信息
    // 如果接口token过期返回了500，小程序端判断token无效时带openid重新通过一下认证即可，用户等待认证时间

    // users列表中排序设置为admin角色的优先、添加时间
    // 返回token、openid（简单做）
    const user = await service.admin.findByName(username);
    if (!user) {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        message: 'Username or password wrong',
      };
    } else {
      if (user.password === helper.encryptPwd(password)) {
        ctx.status = 200;
        const token = app.jwt.sign({
          openid: user.openid,
          id: user.id,
          name: user.name,
          role: user.role.name,
          avatar: user.avatar,
        }, config.jwt.secret, {
          expiresIn: '2h',
        });
        try {

          await app.redis.set(`token_${user.id}`, token);
          ctx.body = ctx.helper.JSONResponse({
            code: 0,
            message: 'Get token success',
            data: token,
          });
        } catch (e) {
          console.error(e);
          ctx.body = {
            code: 500,
            message: 'Server busy, please try again',
          };
        }
      } else {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: 'Username or password wrong',
        };
      }
    }
  }

  async userInfo() {
    const { ctx } = this;
    const { user } = ctx.state;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data: user,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'Logout success',
    };
  }

  async authingAuth() {
    const { ctx, app, config } = this;
    const { helper } = ctx;
    const authingConfig = config.authing;
    const { code } = ctx.query;
    try {
      const authRes = await ctx.curl('https://oauth.authing.cn/oauth/oidc/token', {
        // 必须指定 method
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: helper.stringify({
          code,
          client_id: authingConfig.appId,
          client_secret: authingConfig.appSecret,
          grant_type: 'authorization_code',
          redirect_uri: `${config.deployUrl}authing/auth`,
        }),
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });

      const { access_token } = authRes.data;
      // token 换用户信息
      const userInfoRes = await ctx.curl(`https://users.authing.cn/oauth/oidc/user/userinfo?access_token=${access_token}`, {
        dataType: 'json',
      });

      const userInfo = userInfoRes.data;

      const username = userInfo.name || userInfo.email || userInfo.phone_number;
      const newUser = {
        name: username,
        avatar: userInfo.picture,
        email: userInfo.email,
        register_type: 'authing',
        phone_number: userInfo.phone_number,
        role_id: 2,
      };
      const regRes = await this.authingRegister(newUser);
      // console.log('regRes', regRes);
      const token = app.jwt.sign({
        id: regRes.id,
        name: regRes.name,
        role: 'editor',
        avatar: regRes.avatar,
      }, app.config.jwt.secret, {
        expiresIn: '2h',
      });
      await app.redis.set(`token_${regRes.id}`, token);

      ctx.redirect(`${app.config.authRedirectUrl}?token=${token}`);
    } catch (e) {
      ctx.body = {
        code: 403,
        message: 'Authing auth failed',
        error: e,
      };
      return;
    }
  }

  // authing user register
  async authingRegister(authingUser) {
    const { service } = this.ctx;
    const user = authingUser;
    user.password = '';
    // find same name user
    const exist = await service.admin.findByName(user.name);
    if (!exist) {
      return service.admin.create(authingUser);
    }
    return exist;
  }
}

module.exports = HomeController;
