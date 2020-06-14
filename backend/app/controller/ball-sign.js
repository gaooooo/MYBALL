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
      message: 'success',
    };
  }

  async show() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    const data = await service.ballSign.find(id);
    ctx.body = helper.JSONResponse({
      code: 0,
      data,
      message: 'success',
    });
    ctx.status = 200;
  }

  async create() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const body = ctx.request.body;
    // should encrypt password
    body.password = helper.encryptPwd(body.password);
    const ballSign = await service.ballSign.create(body);
    ctx.body = helper.JSONResponse({
      code: 0,
      data: ballSign,
      message: 'success',
    });
    ctx.status = 201;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    const body = ctx.request.body;
    const data = await service.ballSign.update({
      id,
      updates: body,
    });
    ctx.body = helper.JSONResponse({
      code: 0,
      data,
      message: 'success',
    });
    ctx.status = 200;
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = params.id;
    console.log(1111, id);
    await service.ballSign.destroy(id);
    ctx.body = helper.JSONResponse({
      code: 0,
      data: null,
      message: 'success',
    });
    ctx.status = 200;
  }
}

module.exports = BallSignController;
