const { AxiosMannage } = require('../request/AxiosMannage')
const { getAccessTokenURL } = require('../request/wxRequest')

const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

// 更新AccessToken
const updateAccessToken = async () => {
  const { status, data: { access_token } } = await AxiosMannage.get({ url: getAccessTokenURL })
  if (status !== 200) {
    console.log('baocuo');
    // throw new global.errs.AuthFailed('openid获取失败')
  }
  console.log(access_token);
  // 写文件
  if (access_token) {
    fs.writeFileSync(fileName, JSON.stringify({
      access_token: access_token,
      createTime: new Date()
    }))
  } else {
    await updateAccessToken()
  }
}

// 获取AccessToken
const getAccessToken = async () => {
  // 读取文件
  try {
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj = JSON.parse(readRes)
    const createTime = new Date(readObj.createTime).getTime()
    const nowTime = new Date().getTime()
    if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
      await updateAccessToken()
      await getAccessToken()
    }
    return readObj.access_token
  } catch (error) {
    await updateAccessToken()
    await getAccessToken()
  }
}

setInterval(async () => {
  await updateAccessToken()
}, (7200 - 300) * 1000)

module.exports = getAccessToken