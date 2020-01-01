const getAccessToken = require('./getAccessToken.js')
const { AxiosMannage } = require('@request/AxiosMannage')
const { cloudEvn } = require('@config/config.js')

const callCloudFn = async (ctx, fnName, params) => {
  const ACCESS_TOKEN = await getAccessToken()
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${cloudEvn}&name=${fnName}`
  const data = {
    ...params
  }
  console.log(data);
  return AxiosMannage.post({ url, data })
}

module.exports = callCloudFn