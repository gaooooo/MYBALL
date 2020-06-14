'use strict';

const { Service } = require('egg');


class ballService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.Ball.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const ball = await model.Ball.findByPk(id, {
      include: [{
        model: model.Topic,
        as: 'modelTopic',
      }, {
        model: model.Users,
        as: 'listUser',
      }],
    });
    console.log(9999, JSON.stringify(ball.listUser));
    if (!ball) {
      this.ctx.throw(404, 'ball not found');
    }
    return ball;
  }

  async findByName(name) {
    const { ctx: { model } } = this;
    const ball = await model.Ball.findOne({
      where: {
        name,
      },
    });
    return ball;
  }

  async create(ball) {
    const { ctx: { model } } = this;
    return model.Ball.create(ball);
  }

  async update({ id, updates }) {
    const ball = await this.ctx.model.Ball.findByPk(id);
    if (!ball) {
      this.ctx.throw(404, 'ball not found');
    }
    return ball.update(updates);
  }

  async destroy(id) {
    const ball = await this.ctx.model.Ball.findByPk(id);
    if (!ball) {
      this.ctx.throw(404, 'ball not found');
    }
    return ball.destroy();
  }
}

module.exports = ballService;
