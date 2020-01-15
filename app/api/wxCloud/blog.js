const Router = require('koa-router')
const callCloudDB = require('@utils/callCloudBD')
const cloudStorage = require('@utils/callCloudStorage')

const router = new Router({
  prefix: '/wxCloud/blog'
})

// 获取列表
router.get('/list', async (ctx, next) => {
  const params = ctx.request.query
  const query = `
      db.collection('blog').skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
  `
  const {
    data: {
      errcode,
      pager,
      data,
      errmsg
    }
  } = await callCloudDB(ctx, 'databasequery', query)
  if (errcode === 0) {
    let blogList = []
    if (data.length > 0) {
      blogList = data.map(item => {
        return JSON.parse(item)
      })
    }

    ctx.body = {
      code: 200,
      data: blogList,
      total: pager.Total
    }
  } else {
    ctx.body = {
      code: errcode,
      data: '',
      msg: errmsg
    }
  }

})

// 删除
router.post('/del', async (ctx, next) => {
  const params = ctx.request.body
  console.log(params);
  // 删除blog
  const queryBlog = `db.collection('blog').doc('${params._id}').remove()`
  const delBlogRes = await callCloudDB(ctx, 'databasedelete', queryBlog)

  // 删除blog-comment
  const queryComment = `db.collection('blogComment').where({
      blogId: '${params._id}'
  }).remove()`
  const delCommentRes = await callCloudDB(ctx, 'databasedelete', queryComment)

  // 删除图片
  const delStorageRes = await cloudStorage.delete(ctx, params.img)
  ctx.body = {
    code: 200,
    data: {
      delBlogRes,
      delCommentRes,
      data: delStorageRes.data
    }
  }

})
module.exports = router