'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.limit),
      offset: helper.parseInt(query.offset),
    };
    const data = await service.users.list(options);
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
    ctx.body = await service.users.find(id);
  }

  async create() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const body = ctx.request.body;
    // should encrypt password
    body.password = helper.encryptPwd(body.password);
    const user = await service.users.create(body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = helper.parseInt(params.id);
    ctx.body = await service.users.update({
      id,
      updates: body,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    await service.users.destroy(id);
    ctx.status = 200;
  }
}

module.exports = UserController;
