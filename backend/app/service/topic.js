'use strict';

const { Service } = require('egg');


class TopicService extends Service {
  async list(options) {
    const { ctx: { model } } = this;
    return model.Topic.findAndCountAll({
      ...options,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const { ctx: { model } } = this;
    const topic = await model.Topic.findByPk(id, {
    //   include: [{
    //     model: model.Ball,
    //     as: 'listBall',
    //     attributes: [ 'id', 'title' ],
    //   }],
    });
    if (!topic) {
      this.ctx.throw(404, 'topic not found');
    }
    return topic;
  }

  async findByName(name) {
    const { ctx: { model } } = this;
    const topic = await model.Topic.findOne({
      where: {
        name,
      },
      include: [{
        model: model.Ball,
        as: 'listBall',
        attributes: [ 'id', 'title' ],
      }],
    });
    return topic;
  }

  async findByOpenId(openid) {
    const { ctx: { model } } = this;
    const topic = await model.Topic.findOne({
      where: {
        openid,
      },
      // include: [{
      //   model: model.Ball,
      //   as: 'listBall',
      //   attributes: [ 'id', 'title', 'openid' ],
      // }],
    });
    return topic;
  }

  async create(topic) {
    const { ctx: { model } } = this;
    return model.Topic.create(topic);
  }

  async update({ id, updates }) {
    const topic = await this.ctx.model.Topic.findByPk(id);
    if (!topic) {
      this.ctx.throw(404, 'topic not found');
    }
    return topic.update(updates);
  }

  async destroy(id) {
    const topic = await this.ctx.model.Topic.findByPk(id);
    if (!topic) {
      this.ctx.throw(404, 'topic not found');
    }
    return topic.destroy();
  }
}

module.exports = TopicService;
