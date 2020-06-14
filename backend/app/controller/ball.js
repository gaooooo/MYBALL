'use strict';

const { Controller } = require('egg');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const fs = require('mz/fs');
class BallController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.pageSize),
      offset: helper.parseInt((query.currentPage - 1) * query.pageSize),
    //   include: [{
    //     model: model.Topic,
    //     as: 'modelTopic',
    //     attributes: [ 'id', 'name' ],
    //   }, {
    //     model: model.Users,
    //     as: 'listSign',
    //     attributes: [ 'id', 'name' ],
    //   }],
    };
    const data = await service.ball.list(options);
    ctx.body = helper.JSONResponse({
      code: 0,
      data: {
        count: data.count,
        items: data.rows,
      },
    });
  }

  async show() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    const data = await service.ball.find(id);
    ctx.body = helper.JSONResponse({
      code: 0,
      data,
      message: 'success',
    });
  }

  async create() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const { user } = ctx.state;
    const file = ctx.request.files[0];
    const fields = ctx.request.body;
    let fileOss = null;
    let result = null;
    if (file) {

      const name = 'test/' + file.filename;
      // 文件处理，上传到云存储等等
      try {
        fileOss = await ctx.oss.put(name, file.filepath);

      } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      // await sendToWormhole(stream);
      // throw err;
      } finally {
      // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
    }
    const ballModel = {
      ...fields,
      openid: user.openid,
      image_url: !fileOss ? 'test/default.png' : fileOss.url,
      ball_type: fields.ball_type ? parseInt(fields.ball_type) : 1,
      share_type: fields.share_type ? parseInt(fields.share_type) : 1,
      price: typeof fields.price === 'undefined' ? 0 : parseFloat(fields.price),
      start_time: parseInt(fields.start_time),
      end_time: parseInt(fields.end_time),
      longitude: typeof fields.longitude === 'undefined' ? 0 : parseFloat(fields.longitude),
      latitude: typeof fields.latitude === 'undefined' ? 0 : parseFloat(fields.latitude),
      services: fields.services ? fields.services.split(',').map(o => parseInt(o)) : [],
    };
    result = await service.ball.create(ballModel);
    ctx.body = helper.JSONResponse({
      code: 0,
      data: result,
      message: 'success',
    });
    ctx.status = 201;
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = params.id;
    const file = ctx.request.files[0];
    let fileOss = null;
    if (file) {
      const name = 'test/' + file.filename;
      // 文件处理，上传到云存储等等
      try {
        fileOss = await ctx.oss.put(name, file.filepath);

      } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      // await sendToWormhole(stream);
      // throw err;
      } finally {
      // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
    }
    body.image_url = !fileOss ? 'test/default.png' : fileOss.url;
    const data = await service.ball.update({
      id,
      updates: body,
    });
    ctx.body = helper.JSONResponse({
      code: 0,
      data,
      message: 'success',
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    await service.ball.destroy(id);
    ctx.body = helper.JSONResponse({
      code: 0,
      data: null,
      message: 'success',
    });
    ctx.status = 200;
  }

  async signUp() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const body = ctx.request.body;

    const { user } = ctx.state;

    const userModel = await service.users.findByOpenId(user.openid);
    if (!userModel) {
      ctx.body = helper.JSONResponse({
        code: 1,
        data: null,
        message: '用户未注册',
      });
      return;
    }
    // 若报名球局未注册过手机号
    if (!userModel.mobile_phone) {
      const { mobile_phone, real_name } = ctx.request.body;
      await service.users.update({
        openid: userModel.openid,
        updates: { mobile_phone, real_name },
      });
    }
    // 报名时 检测报名是否已满
    if (body.sign_status === 1) {
      const ball = await service.ball.find(body.ball_id);
      if (!ball) {
        ctx.body = helper.JSONResponse({
          code: 1,
          data: null,
          message: '活动不存在',
        });
        return;
      }
      if (ball.people_num === ball.listUser.length) {
        ctx.body = helper.JSONResponse({
          code: 0,
          data: {
            isNum: false,
          },
          message: '报名已满，是否等坑？',
        });
        return;
      }
    }
    const data = await service.ballSign.create({
      openid: userModel.openid,
      ...body,
    });
    ctx.body = helper.JSONResponse({
      code: 0,
      data,
      message: 'success',
    });
  }

  //   async signUpListById() {
  //     const { ctx } = this;
  //     const { query, service, helper } = ctx;
  //     const ballId = query.id;
  //     const options = {
  //       limit: 1,
  //       offset: 100,
  //       where: {
  //         ball_id: ballId,
  //       },
  //     };
  //     const ball = await service.ball.find(ballId);
  //     const ballsigns = await service.ballSign.list(options);

//     if (ball.listUser.length > 0 && ballsigns.rows.length > 0) {
//       ball.listUser.map(user => {
//         const sign = ballsigns.rows.find(sign => sign.openid === user.openid);
//         return {
//           ...user,
//           sign_status: sign.sign_status,
//           sign_id: sign.id,
//         };
//       });
//     }
//     ctx.body = helper.JSONResponse({
//       code: 0,
//       data: ball,
//       message: 'success',
//     });
//   }
}

module.exports = BallController;
