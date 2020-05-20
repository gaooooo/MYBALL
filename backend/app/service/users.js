'use strict';

const { Service } = require('egg');


class UsersService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.Users.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const user = await model.Users.findByPk(id, {
      include: [{
        model: model.Ball,
        as: 'listBall',
        attributes: [ 'id', 'title' ],
      }],
    });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findByName(name) {
    const { ctx: { model } } = this;
    const user = await model.Users.findOne({
      where: {
        name,
      },
      include: [{
        model: model.Ball,
        as: 'listBall',
        attributes: [ 'id', 'title' ],
      }],
    });
    return user;
  }

  async findByOpenId(openid) {
    const { ctx: { model } } = this;
    const user = await model.Users.findOne({
      where: {
        openid,
      },
      include: [{
        model: model.Ball,
        as: 'listBall',
        attributes: [ 'id', 'title' ],
      }],
    });
    return user;
  }

  async create(user) {
    const { ctx: { model } } = this;
    return model.Users.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.Users.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async destroy(id) {
    const user = await this.ctx.model.Users.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }
}

module.exports = UsersService;
