import axios from "axios";
import HttpClient, {REDIRECT_URI} from "./HttpClient";
import {CookieStorage} from "../utils/CookieStorage";

axios.interceptors.request.use(
    config => {

        if (config.method === 'get'
            && config.params.code
            && config.url
            && config.url.includes("me")) {

            HttpClient.exchangeAuthCode(config.params.code)
                .then(accessTokenResponse => CookieStorage.saveEntireTokenResponse(accessTokenResponse))
                .catch(error => console.log(error));

            config.headers['Authorization'] = 'Bearer ' + CookieStorage.getAccessToken();
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);