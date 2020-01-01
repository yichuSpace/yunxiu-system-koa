const { APPID, APPSECRET } = require('../config/config')

const getAccessTokenURL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}` // 获取accessToken地址

module.exports = {
  getAccessTokenURL
}