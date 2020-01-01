const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    //把app.js中的koa实例传进来
    InitManager.app = app;
    InitManager.initLoadRouters();
  }

  static loadConfig() {
    const configPath = process.cwd() + '/config/globalConfig.js';
    const config = require(configPath);
    global.config = config;
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    // 将所有的路由加载上,自动加载代码
    const modules = requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager;