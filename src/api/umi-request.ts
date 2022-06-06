import {extend, RequestOptionsInit} from 'umi-request'
import {getToken} from "@/utils/auth";
import QProgress from "qier-progress";

const qprogress = new QProgress()
/**
 * 配置request请求时的默认参数
 */
const client = extend({
    prefix: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 5000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})


// request拦截器, 改变url 或 options
client.interceptors.request.use((url:string, options:any) => {
    qprogress.start()
    const headers = getToken()
        ? {
            Authorization: `Bearer ${getToken()}`
        }
        : {}

    return {
        url,
        options: { ...options, headers }
    }
}, { global: false })


client.interceptors.response.use(async (response:any) => {
    const res = await response.clone().json()
    qprogress.finish()

    if ( res.ok === 0){
        console.log(res);
        window.$message.error(res.message || res.message[0])
        console.log('start');
        return undefined
    }

    return response
})





export default client
