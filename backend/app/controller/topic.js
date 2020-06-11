'use strict';

const { Controller } = require('egg');
const fs = require('mz/fs');
class TopicController extends Controller {
  async index() {
    const { ctx } = this;
    const { query, model, service, helper } = ctx;
    const options = {
      limit: helper.parseInt(query.pageSize),
      offset: helper.parseInt((query.currentPage - 1) * query.pageSize),
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
    const file = ctx.request.files[0];
    const body = ctx.request.body;
    body.openid = user.openid;
    // should encrypt password
    // body.password = helper.encryptPwd(body.password);
    let fileOss = null;
    const result = null;
    if (file) {

      const name = 'topic/' + file.filename;
      // 文件处理，上传到云存储等等
      try {
        fileOss = await ctx.oss.put(name, file.filepath);

      } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      // await sendToWormhole(stream);
      // throw err;
      } finally {
      // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
    }
    body.image_url = !fileOss ? 'test/default.png' : fileOss.url;
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
    const file = ctx.request.files[0];
    let fileOss = null;
    if (file) {
      const name = 'test/' + file.filename;
      // 文件处理，上传到云存储等等
      try {
        fileOss = await ctx.oss.put(name, file.filepath);

      } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      // await sendToWormhole(stream);
      // throw err;
      } finally {
      // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
    }
    // TODO 删除旧文件
    body.image_url = !fileOss ? 'test/default.png' : fileOss.url;
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
