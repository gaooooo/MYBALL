'use strict';

const { Service } = require('egg');


class SpeakingService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.Speaking.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const speaking = await model.Speaking.findByPk(id, {
    //   include: [{
    //     model: model.Ball,
    //     as: 'listBall',
    //     attributes: [ 'id', 'title' ],
    //   }],
    });
    if (!speaking) {
      this.ctx.throw(404, 'speaking not found');
    }
    return speaking;
  }

  async findByName(name) {
    const { ctx: { model } } = this;
    const speaking = await model.Speaking.findOne({
      where: {
        name,
      },
      include: [{
        model: model.Ball,
        as: 'listBall',
        attributes: [ 'id', 'title' ],
      }],
    });
    return speaking;
  }

  async findByOpenId(openid) {
    const { ctx: { model } } = this;
    const speaking = await model.Speaking.findOne({
      where: {
        openid,
      },
      // include: [{
      //   model: model.Ball,
      //   as: 'listBall',
      //   attributes: [ 'id', 'title', 'openid' ],
      // }],
    });
    return speaking;
  }

  async create(speaking) {
    const { ctx: { model } } = this;
    return model.Speaking.create(speaking);
  }

  async update({ id, updates }) {
    const speaking = await this.ctx.model.Speaking.findByPk(id);
    if (!speaking) {
      this.ctx.throw(404, 'speaking not found');
    }
    return speaking.update(updates);
  }

  async destroy(id) {
    const speaking = await this.ctx.model.Speaking.findByPk(id);
    if (!speaking) {
      this.ctx.throw(404, 'speaking not found');
    }
    return speaking.destroy();
  }
}

module.exports = SpeakingService;
