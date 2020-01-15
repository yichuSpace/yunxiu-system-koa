const Router = require('koa-router')
const router = new Router({
  prefix: '/bookshelf/book'
})
// 获取列表
router.get('/list', async (ctx, next) => {
  console.log('jile')
})
module.exports = router