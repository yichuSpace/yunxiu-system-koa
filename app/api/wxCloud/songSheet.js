const Router = require('koa-router')
const callCloudDB = require('@utils/callCloudBD')
const callCloudFn = require('@utils/callCloudFn')

const router = new Router({
  prefix: '/wxCloud/songSheet'
})

router.get('/list', async (ctx, next) => {
  const query = ctx.request.query
  const res = await callCloudFn(ctx, 'music', {
    $url: 'getSongSheetList',
    startNum: parseInt(query.start),
    count: parseInt(query.count)
  })
  let data = []
  if (res.data.resp_data) {
    data = JSON.parse(res.data.resp_data).data
  }
  ctx.body = {
    data,
    code: 0,
  }
})

// 通过ID获取详情
router.get('/getById', async (ctx, next) => {
  const query = `db.collection('songSheetList').doc('${ctx.request.query.id}').get()`
  const res = await callCloudDB(ctx, 'databasequery', query)
  console.log(res.data);
  ctx.body = {
    code: 0,
    data: {
      detail: JSON.parse(res.data.data)
    }
  }
})

// 修改歌单详情
router.post('/updateSongSheetList', async (ctx, next) => {
  const params = ctx.request.body
  const query = `
      db.collection('songSheetList').doc('${params._id}').update({
          data: {
              name: '${params.name}',
              copywriter: '${params.copywriter}'
          }
      })
  `
  console.log(query);
  const res = await callCloudDB(ctx, 'databaseupdate', query)
  ctx.body = {
    code: 0,
    data: res.data
  }
})
// 删除歌单
router.get('/delete', async (ctx, next) => {
  const params = ctx.request.query
  console.log(params);
  const query = `db.collection('songSheetList').doc('${params.id}').remove()`
  const res = await callCloudDB(ctx, 'databasedelete', query)
  ctx.body = {
    code: 0,
    data: res
  }
})
module.exports = router