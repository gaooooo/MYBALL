'use strict';

const { Controller } = require('egg');

class BallSignController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.pageSize),
      offset: helper.parseInt((query.currentPage - 1) * query.pageSize),
    };
    const data = await service.ballSign.list(options);
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
    ctx.body = await service.ballSign.find(id);
  }

  async create() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const body = ctx.request.body;
    // should encrypt password
    body.password = helper.encryptPwd(body.password);
    const ballSign = await service.ballSign.create(body);
    ctx.status = 201;
    ctx.body = ballSign;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = helper.parseInt(params.id);
    ctx.body = await service.ballSign.update({
      id,
      updates: body,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    await service.ballSign.destroy(id);
    ctx.status = 200;
  }
}

module.exports = BallSignController;
