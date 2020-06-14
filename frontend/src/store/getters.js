const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  openid: state => state.user.openid
  // userId: state => state.user.userId,
  // userRealName: state => state.user.userRealName,
  // userAvatar: state => state.user.userAvatar,
  // userMobilePhone: state => state.user.userMobilePhone
}
export default getters
