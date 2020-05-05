'use strict';

const { Controller } = require('egg');

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.limit),
      offset: helper.parseInt(query.offset),
      attributes: [ 'id', 'name', 'age', 'avatar', 'introduction', 'created_at' ],
      include: [{
        model: model.Role,
        as: 'role',
        attributes: [ 'id', 'name' ],
      }],
    };
    const data = await service.admin.list(options);
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
    ctx.body = await service.admin.find(id);
  }

  async create() {
    const { ctx } = this;
    const { service, helper } = ctx;
    const body = ctx.request.body;
    // should encrypt password
    body.password = helper.encryptPwd(body.password);
    const user = await service.admin.create(body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const body = ctx.request.body;
    const id = helper.parseInt(params.id);
    ctx.body = await service.admin.update({
      id,
      updates: body,
    });
  }

  async destroy() {
    const { ctx } = this;
    const { params, service, helper } = ctx;
    const id = helper.parseInt(params.id);
    await service.admin.destroy(id);
    ctx.status = 200;
  }
}

module.exports = AdminController;
