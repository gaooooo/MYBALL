import config from '../utils/config.js';
const domain = config.getDomainBall;
const pageCount = 10;
const HOST_URI = 'http://localhost:7001';


import  {request} from '../utils/request';
export async function postLogin(data) {
    return await request.request({
        url: HOST_URI + '/loginByMini',
        method: 'post', 
        data
    });
}
const MyService = {
    postLogin
}
export default MyService;

