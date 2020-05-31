/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
// inject environment variables by dotenv
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: path.join(__dirname, '..', '.env.local'),
  });
} else {
  require('dotenv').config();
}

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const isLocal = appInfo.env === 'local';
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    env: 'prod', // 推荐云函数的 egg 运行环境变量修改为 prod
    rundir: '/tmp',
    logger: {
      dir: '/tmp',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580783791359_8688';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // TODO: should change to deploy url.
    deployUrl: isLocal ? 'http://127.0.0.1:7001/' : 'https://service-f1bhmhk4-1251556596.gz.apigw.tencentcs.com/release/',
    authRedirectUrl: isLocal ? 'http://localhost:9528/#/login' : 'https://sls-admin.yugasun.com/#/login',
    // myAppName: 'egg',
    sequelize: {
      sync: true, // whether sync when app init
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
      // underscored: false,
      // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
      timezone: '+08:00',
    },
    redis: {
      client: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        db: 0,
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    jwt: {
      secret: process.env.AUTHING_APPSECRET,
    },
    authing: {
      appId: process.env.AUTHING_APPID,
      appSecret: process.env.AUTHING_APPSECRET,
    },
    oss: {
      client: {
        accessKeyId: process.env.OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
        bucket: 'myball',
        endpoint: process.env.OSS_ENDPOINT,
        timeout: '60s',
      },
    },
    mp: {
      appId: process.env.EGG_PASSPORT_WEAPP_CLIENT_ID, // 公众平台应用编号
      appSecret: process.env.EGG_PASSPORT_WEAPP_CLIENT_SECRET, // 公众平台应用密钥
      mchId: '', // 商户平台商家编号
      apiKey: '', // 商户支付密钥
      notifyUrl: '', // 支付结果回调地址
    },
    onerror: {
      all(err, ctx) {
        // 在此处定义针对所有响应类型的错误处理方法
        // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
        console.log('hehehe', ctx.helper.JSONResponse({ code: err.code, data: null, message: err.message }));
        ctx.body = ctx.helper.JSONResponse({ code: err.code, data: null, message: err.message });
        ctx.status = err.status;
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
