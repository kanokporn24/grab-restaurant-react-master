//เป็นตัวเขียนแพทเทอน์แบบวิงเกอร์ตัน เป็นตัวดักจับ
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
import TokenService from "./token.services";

const instance = axios.create({
    baseURL: BASE_URL,
    Headers: {
        "Content-type": "application/json"
    },
    auth: {
        username: USERNAME,
        password: PASSWORD
    }
});

//Add Interceptor to request object
instance.interceptors.reqest.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.Headers["x-access-token"] = token;
        }
        return token;
    },
    (Error) => {
        return Promise.reject(Error);
    }
);
//Add Interceptor to reponse object
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/api/auth/isgin" && err.response) {
            if (err.response.status === 401 && !originalConfig._response) {
                originalConfig._retry = true;
                try {
                    const rs = await instance.post("/api/auth/refreshtoken", {
                        ReferenceToken: TokenService.getLocalRefreshToken()
                    })
                    const { accessToken } = rs.data;
                    TokenService.setLocalAccessToken(accessToken);
                    return instance(originalConfig);
                }   catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;
