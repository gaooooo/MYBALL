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
}

module.exports = BallController;
