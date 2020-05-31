// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportBall = require('../../../app/model/ball');
import ExportBallSign = require('../../../app/model/ball_sign');
import ExportPost = require('../../../app/model/post');
import ExportRole = require('../../../app/model/role');
import ExportSpeaking = require('../../../app/model/speaking');
import ExportSpeakingComment = require('../../../app/model/speaking_comment');
import ExportSpeakingFavorite = require('../../../app/model/speaking_favorite');
import ExportTopic = require('../../../app/model/topic');
import ExportTopicFocus = require('../../../app/model/topic_focus');
import ExportTopicSpeaking = require('../../../app/model/topic_speaking');
import ExportUsers = require('../../../app/model/users');
import ExportUsersFocus = require('../../../app/model/users_focus');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Ball: ReturnType<typeof ExportBall>;
    BallSign: ReturnType<typeof ExportBallSign>;
    Post: ReturnType<typeof ExportPost>;
    Role: ReturnType<typeof ExportRole>;
    Speaking: ReturnType<typeof ExportSpeaking>;
    SpeakingComment: ReturnType<typeof ExportSpeakingComment>;
    SpeakingFavorite: ReturnType<typeof ExportSpeakingFavorite>;
    Topic: ReturnType<typeof ExportTopic>;
    TopicFocus: ReturnType<typeof ExportTopicFocus>;
    TopicSpeaking: ReturnType<typeof ExportTopicSpeaking>;
    Users: ReturnType<typeof ExportUsers>;
    UsersFocus: ReturnType<typeof ExportUsersFocus>;
  }
}
