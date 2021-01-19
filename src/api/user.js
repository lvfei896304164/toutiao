import request from '@/utils/request';
const login = {
  postlogin(data) {
    return request({
      method: 'POST',
      url: '/v1_0/authorizations',
      data,
    });
  },
  getlogin(mobile) {
    return request({
      method: 'GET',
      url: `/v1_0/sms/codes/${mobile}`,
    });
  },
  // 获取用户自己的信息
  getUserInfo() {
    return request({
      method: 'GET',
      url: '/v1_0/user',
      // headers: { Authorization: `Bearer ${store.state.user.token}` },
    });
  },
  // 获取频道列表
  getUserChannerl() {
    return request({
      method: 'GET',
      url: '/v1_0/user/channels',
      // headers: { Authorization: `Bearer ${store.state.user.token}` },
    });
  },
  // 关注用户
  articletarge(target) {
    return request({
      method: 'POST',
      url: '/v1_0/user/followings',
      data: {
        target,
      },
    });
  },
  // 取消关注用户
  deletearticle(target) {
    return request({
      method: 'DELETE',
      url: `/v1_0/user/followings/${target}`,
    });
  },
};
export default login;
