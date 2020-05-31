
// header里面的Authorization（token）的值
const AUTH_KEY = 'Authorization'
// 更新token方法
export const updateToken = (token) => wx.setStorageSync(AUTH_KEY, token)
// 清除token方法
export const removeToken = () => wx.setStorageSync(AUTH_KEY, '')
// 获取token方法
export const getToken = () => {
  let token = wx.getStorageSync(AUTH_KEY)
  if (token) {
    if (/^Bearer/.test(token) === false) {
      token = `Bearer ${token}`
    }
    return token
  }
}