'use strict';

const koajwt = require('koa-jwt2');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  router.get('/get-config', controller.home.getAppConfig);
  router.post('/login', controller.home.login);
  router.get('/refresh-token', controller.home.refreshToken);
  router.post('/login-mini', controller.home.loginByMini);
  router.get('/user-info', jwt, controller.home.userInfo);
  router.get('/user-info-byopenid', jwt, controller.user.findByOpenId);

  const isRevokedAsync = function(req, payload) {
    return new Promise(resolve => {
      try {
        const userId = payload.id;
        const tokenKey = `token_${userId}`;
        const token = app.redis.get(tokenKey);
        if (token) {
          app.redis.del(tokenKey);
        }
        resolve(false);
      } catch (e) {
        resolve(true);
      }

    });
  };
  router.post('/logout', koajwt({
    secret: app.config.jwt.secret,
    credentialsRequired: false,
    isRevoked: isRevokedAsync,
  }), controller.home.logout);

  router.get('/authing/auth', controller.home.authingAuth);

  router.resources('roles', '/roles', controller.role);
  router.resources('admins', '/admins', controller.admin);
  router.resources('posts', '/posts', controller.post);
  router.resources('users', '/users', jwt, controller.user);

  router.resources('topics', '/topics', jwt, controller.topic);
  router.resources('speakings', '/speakings', jwt, controller.speaking);

  router.post('/balls/sign-up', jwt, controller.ball.signUp);
  // router.get('/balls/sign-list', jwt, controller.ball.signUpListById);
  router.resources('balls', '/balls', jwt, controller.ball);
  router.resources('ball-signs', '/ball-signs', jwt, controller.ballSign);
};
