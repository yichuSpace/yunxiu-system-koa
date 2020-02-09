const getAccessToken = require('./getAccessToken.js')
const { AxiosMannage } = require('@request/AxiosMannage')
const { cloudEvn } = require('@config/config.js')
const FormData = require('form-data')
const fs = require('fs');

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

  async upload(ctx) {
    // 1、请求地址
    const ACCESS_TOKEN = await getAccessToken()
    const file = ctx.request.files.file
    const path = `swiper/${Date.now()}-${Math.random()}-${file.name}`
    const url = `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`
    const data = {
      path,
      env: cloudEvn,
    }
    //  1.请求参数的
    const { data: info } = await AxiosMannage.post({ url, data })
    // 2、上传图片到云存储
    let formDataObj = new FormData();
    formDataObj.append('key', path);
    formDataObj.append('Signature', info.authorization);
    formDataObj.append('x-cos-security-token', info.token)
    formDataObj.append('x-cos-meta-fileid', info.cos_file_id)
    formDataObj.append('file', fs.createReadStream(file.path))
    console.log(info.url);
    const uploadInfo = await AxiosMannage.postFormData({ url: info.url, data: formDataObj })
    console.log(uploadInfo);

    // return info.file_id
  },

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