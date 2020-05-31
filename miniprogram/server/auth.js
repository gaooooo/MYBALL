import config from '../utils/config.js';
const domain = config.getDomainBall;
const host_url = config.getHostUrl;


import  {request} from '../utils/request';
export async function refreshToken(data) {
    return await request.request({
        url: host_url + '/refresh-token',
        method: 'get', 
        data
    });
}

const AuthService = {
    refreshToken,
}
export default AuthService;

