/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580301877706_9738';

  // add your middleware config here
  config.middleware = ['send', 'verify', 'params'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.jwt = {
    secret: 'buzhidaoxieshenm',
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: "123456",
    database: 'web',
  };
  // 七牛云秘钥
  config.qiniuKey = {
    accessKey: 'ZC-ULse52ExzKrPTbz6EgZtN3X7fVqmrPaMqCsKm',
    secretKey: 'z9--TlvD_SXSWhCSqe_mdI4REDSA3jNpsm51UZIw',
    storageName: 'web-c',

  };

  config.makeId = {
    // 长度限制在6位以内
    topic: 'topic',
    topicTrace: 'trace',
    topicFiles: 'files',
    teachLog: 'teach',
  }

  // 安全配置
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:8000']
  }
  config.cors = {
    // origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  return {
    ...config,
    ...userConfig,
  };
};
