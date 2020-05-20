const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

let baseUrl = ''
const interceptors = []

class Request {
    /**
     * response interceptor
     */
    intercept(res, resolve, reject) {
        return interceptors
            .filter((f) => typeof f === 'function')
            .every((f) => f(res, resolve, reject))
    }

    /**
     * request
     */
    request(option) {
        const header = {
            // 'content-type': 'application/x-www-form-urlencoded'
            'content-type': 'application/json'
        }
        const { url, method, data = {} } = option

        return new Promise((resolve, reject) => {
            try {
                wx.request({
                    url: baseUrl + url,
                    method: method || METHOD.GET,
                    data,
                    header,
                    success: (res) => this.intercept(res, resolve, reject),
                    fail: (err) => {
                        if (
                            err &&
                            err.errMsg &&
                            err.errMsg.indexOf('request:fail') !== -1
                        ) {
                            console.error('wx request error: ', err)
                        } else {
                            wx.showToast({
                                title: JSON.stringify(err),
                                icon: 'none',
                                duration: 10000
                            })
                        }
                    }
                })
            } catch (err) {
                wx.showToast({ title: err.message, icon: 'none' })
            }
        })
    }

    get(url, data) {
        return this.request({ url, method: METHOD.GET, data })
    }

    post(url, data) {
        return this.request({ url, method: METHOD.POST, data })
    }

    put(url, data) {
        return this.request({ url, method: METHOD.PUT, data })
    }

    delete(url, data) {
        return this.request({ url, method: METHOD.DELETE, data })
    }

    all(tasks) {
        return Promise.all(tasks)
    }
}

/**
 * 设置base URL
 */
function setBaseUrl(url) {
    baseUrl = url
}

/**
 * 默认response拦截器
 */
function addDefaultInterceptor() {
    interceptors.push((res, resolve, reject) => {
        const status = res.statusCode
        if (status !== 200) {
            return reject(new Error(`internet error: ${status}`))
        }
        const body = res.data
        if (body.errno !== 0) {
            return reject({
                message: body.error,
                body
            })
        }
        return resolve(body.data)
    })
}

const request = new Request()

export { setBaseUrl, addDefaultInterceptor, request }