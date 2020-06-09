// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportBall = require('../../../app/controller/ball');
import ExportHome = require('../../../app/controller/home');
import ExportPost = require('../../../app/controller/post');
import ExportRole = require('../../../app/controller/role');
import ExportSpeaking = require('../../../app/controller/speaking');
import ExportTopic = require('../../../app/controller/topic');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    ball: ExportBall;
    home: ExportHome;
    post: ExportPost;
    role: ExportRole;
    speaking: ExportSpeaking;
    topic: ExportTopic;
    user: ExportUser;
  }
}
