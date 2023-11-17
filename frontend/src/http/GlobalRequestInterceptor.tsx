import axios from "axios";
import {CookieStorage} from "../utils/CookieStorage";

axios.interceptors.request.use(
    config => {
        const token = CookieStorage.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        } else {
            window.location.href = "/unauthenticated";
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);