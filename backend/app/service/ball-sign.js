'use strict';

const { Service } = require('egg');


class BallSignService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.BallSign.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const ballSign = await model.BallSign.findByPk(id);
    if (!ballSign) {
      this.ctx.throw(404, 'ballSign not found');
    }
    return ballSign;
  }

  // async getListByBallId(ball_id) {
  //   const { ctx: { model } } = this;
  //   const ballSign = await model.BallSign.findAndCountAll({
  //     {
  //       ball_id,

  //     },
  //     order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
  //   });
  //   return ballSign;
  // }

  async create(ballSign) {
    const { ctx: { model } } = this;
    return model.BallSign.create(ballSign);
  }

  async update({ id, updates }) {
    const ballSign = await this.ctx.model.BallSign.findByPk(id);
    if (!ballSign) {
      this.ctx.throw(404, 'ballSign not found');
    }
    return ballSign.update(updates);
  }

  async destroy(id) {
    const ballSign = await this.ctx.model.BallSign.findByPk(id);
    if (!ballSign) {
      this.ctx.throw(404, 'ballSign not found');
    }
    return ballSign.destroy();
  }
}

module.exports = BallSignService;
