// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdmin = require('../../../app/service/admin');
import ExportBall = require('../../../app/service/ball');
import ExportPost = require('../../../app/service/post');
import ExportRole = require('../../../app/service/role');
import ExportSpeaking = require('../../../app/service/speaking');
import ExportTopic = require('../../../app/service/topic');
import ExportUsers = require('../../../app/service/users');

declare module 'egg' {
  interface IService {
    admin: AutoInstanceType<typeof ExportAdmin>;
    ball: AutoInstanceType<typeof ExportBall>;
    post: AutoInstanceType<typeof ExportPost>;
    role: AutoInstanceType<typeof ExportRole>;
    speaking: AutoInstanceType<typeof ExportSpeaking>;
    topic: AutoInstanceType<typeof ExportTopic>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
