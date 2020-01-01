const getAccessToken = require('./getAccessToken.js')
const { AxiosMannage } = require('@request/AxiosMannage')
const { cloudEvn } = require('@config/config.js')

const callCloudDB = async (ctx, fnName, query = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  const url = `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`
  const data = {
    query,
    env: cloudEvn,
  }
  return AxiosMannage.post({ url, data })
}

module.exports = callCloudDB