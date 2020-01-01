require('module-alias/register')
const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const InitManager = require('./core/init')
const static = require('koa-static')   //静态资源服务插件
const path = require('path')

const app = new Koa()

app.use(cors())

// 接收post参数解析
app.use(koaBody({
  multipart: true,
}))


app.use(static(path.join(__dirname, './static'))) // 配置静态资源

InitManager.initCore(app) //使用require-directory加载路由文件夹下的所有router

app.listen(3000)