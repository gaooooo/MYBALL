'use strict';

const { Controller } = require('egg');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
class BallController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.limit),
      offset: helper.parseInt(query.offset),
      attributes: [ 'id', 'title', 'image_url', 'ball_type', 'address', 'status' ],
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
    ctx.body = {
      code: 0,
      data: {
        count: data.count,
        items: data.rows,
      },
    };
  }

  async show() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    ctx.body = await service.ball.find(id);
  }

  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const body = ctx.request.body;
    const stream = await ctx.getFileStream();
    const name = 'test/' + path.basename(stream.filename);
    console.log(999, body, stream.fields);


    const fields = stream.fields;
    // 文件处理，上传到云存储等等
    let result;
    try {
      result = await ctx.oss.put(name, stream);
      const ballModel = {
        ...fields,
        image_url: result.url,
        ball_type: fields.ball_type ? parseInt(fields.ball_type) : 1,
        share_type: fields.share_type ? parseInt(fields.share_type) : 1,
        price: typeof fields.price === 'undefined' ? 0 : parseFloat(fields.price),
        start_time: parseInt(fields.start_time),
        end_time: parseInt(fields.end_time),
        longitude: typeof fields.longitude === 'undefined' ? 0 : parseFloat(fields.longitude),
        latitude: typeof fields.latitude === 'undefined' ? 0 : parseFloat(fields.latitude),
      };
      result = await service.ball.create(ballModel);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    ctx.status = 201;
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = helper.parseInt(params.id);
    ctx.body = await service.ball.update({
      id,
      updates: body,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    await service.ball.destroy(id);
    ctx.status = 200;
  }
}

module.exports = BallController;
