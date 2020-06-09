'use strict';

const { Controller } = require('egg');

class TopicController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.limit),
      offset: helper.parseInt(query.offset),
    };
    const data = await service.topic.list(options);
    ctx.body = helper.JSONResponse({
      code: 0,
      data: {
        count: data.count,
        items: data.rows,
      },
      message: 'success',
    });
  }

  async show() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    const data = await service.topic.find(id);
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
    const body = ctx.request.body;
    body.openid = user.openid;
    // should encrypt password
    // body.password = helper.encryptPwd(body.password);
    const topic = await service.topic.create(body);
    ctx.status = 201;
    ctx.body = helper.JSONResponse({
      code: 0,
      data: topic,
      message: 'success',
    });
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = params.id;
    const topic = await service.topic.update({
      id,
      updates: body,
    });
    ctx.body = helper.JSONResponse({
      code: 0,
      data: topic,
      message: 'success',
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    await service.topic.destroy(id);
    ctx.status = 200;
  }
}

module.exports = TopicController;
