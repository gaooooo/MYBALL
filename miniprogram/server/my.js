import config from '../utils/config.js';
const domain = config.getDomainBall;
const pageCount = 10;
const HOST_URI = config.getHostUrl;


import  {request} from '../utils/request';
export async function postLogin(data) {
    return await request.request({
        url: HOST_URI + '/login-mini',
        method: 'post', 
        data
    });
}
export async function postLogout(data) {
    return await request.request({
        url: HOST_URI + '/loginout',
        method: 'post', 
        data
    });
}
export async function getUserInfo() {
    return await request.request({
        url: HOST_URI + '/user-info',
        method: 'get'
    })
}
const MyService = {
    postLogin,
    postLogout,
    getUserInfo,
}
export default MyService;

