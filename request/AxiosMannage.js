const axios = require('axios');
const fs = require('fs');

/**
 * 用于访问其他网站的http与https模块
 * 
 */
class AxiosMannage {

  /***
   * get promise请求包装
   * 
   */
  static async get({ url, data = {} }) {
    return await new Promise(
      (resolve, reject) => {
        axios.get(url, { params: data }).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      }
    );

  }

  /***
   * post promise请求包装
   * 
   */
  static async post({ url, data }) {
    return await new Promise(
      (resolve, reject) => {
        axios.post(url, data).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      }
    );
  }


  /***
   * 下载网络资源
   * 
   * @param type get/post 
   * 
   * @param url 文件资源地址
   * 
   * @param path 保存地址
   * 
   * 
   */
  static download({ type = 'get', url, path }) {
    axios({
      method: type,
      url,
      responseType: 'stream'
    }).then((response) => {
      response.data.pipe(fs.createWriteStream(path));
    })
  }
}

module.exports = { AxiosMannage };