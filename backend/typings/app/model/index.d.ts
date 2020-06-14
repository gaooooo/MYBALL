// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportBallSign = require('../../../app/model/ball-sign');
import ExportBall = require('../../../app/model/ball');
import ExportPost = require('../../../app/model/post');
import ExportRole = require('../../../app/model/role');
import ExportSpeakingComment = require('../../../app/model/speaking-comment');
import ExportSpeakingFavorite = require('../../../app/model/speaking-favorite');
import ExportSpeaking = require('../../../app/model/speaking');
import ExportTopicFocus = require('../../../app/model/topic-focus');
import ExportTopicSpeaking = require('../../../app/model/topic-speaking');
import ExportTopic = require('../../../app/model/topic');
import ExportUsersFocus = require('../../../app/model/users-focus');
import ExportUsers = require('../../../app/model/users');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    BallSign: ReturnType<typeof ExportBallSign>;
    Ball: ReturnType<typeof ExportBall>;
    Post: ReturnType<typeof ExportPost>;
    Role: ReturnType<typeof ExportRole>;
    SpeakingComment: ReturnType<typeof ExportSpeakingComment>;
    SpeakingFavorite: ReturnType<typeof ExportSpeakingFavorite>;
    Speaking: ReturnType<typeof ExportSpeaking>;
    TopicFocus: ReturnType<typeof ExportTopicFocus>;
    TopicSpeaking: ReturnType<typeof ExportTopicSpeaking>;
    Topic: ReturnType<typeof ExportTopic>;
    UsersFocus: ReturnType<typeof ExportUsersFocus>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
