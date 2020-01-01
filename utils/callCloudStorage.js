const getAccessToken = require('./getAccessToken.js')
const { AxiosMannage } = require('@request/AxiosMannage')
const { cloudEvn } = require('@config/config.js')

const cloudStorage = {
  async download(ctx, fileList) {
    const ACCESS_TOKEN = await getAccessToken()
    const url = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`

    const data = {
      fileid_list,
      env: cloudEvn,
    }
    return AxiosMannage.post({ url, data })
  },

  // async upload(ctx) {
  //   // 1、请求地址
  //   const ACCESS_TOKEN = await getAccessToken()
  //   const file = ctx.request.files.file
  //   const path = `swiper/${Date.now()}-${Math.random()}-${file.name}`
  //   const options = {
  //     method: 'POST',
  //     uri: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
  //     body: {
  //       path,
  //       env: ctx.state.env,
  //     },
  //     json: true // Automatically stringifies the body to JSON
  //   };
  //   //  请求参数的
  //   const info = await rp(options)
  //     .then(function (res) {
  //       return res
  //     })
  //     .catch(function (err) {
  //     })
  //   console.log(info)
  //   // 2、上传图片
  //   const params = {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     },
  //     uri: info.url,
  //     formData: {
  //       key: path,
  //       Signature: info.authorization,
  //       'x-cos-security-token': info.token,
  //       'x-cos-meta-fileid': info.cos_file_id,
  //       file: fs.createReadStream(file.path)
  //     },
  //     json: true
  //   }
  //   await rp(params)
  //   return info.file_id
  // },

  async delete(ctx, fileid_list) {
    const ACCESS_TOKEN = await getAccessToken()
    const url = `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${ACCESS_TOKEN}`
    console.log(fileid_list);
    const data = {
      fileid_list,
      env: cloudEvn,
    }
    console.log(data);
    return AxiosMannage.post({ url, data })
  }
}

module.exports = cloudStorage