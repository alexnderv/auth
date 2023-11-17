import axios from "axios";
import HttpClient, {AUTH_SERVER_URL, CLIENT_ID, REDIRECT_URI} from "./HttpClient";
import {CookieStorage} from "../utils/CookieStorage";

axios.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        const originalRequest = error.config

        if (
            error.response.status === 401 &&
            originalRequest.url === AUTH_SERVER_URL + '/auth2/token') {

            window.location.href = HttpClient.getAuthUrl();

            return Promise.reject(error)
        }

        if (error.response.status === 401) {

            const refreshToken = CookieStorage.getRefreshToken()

            const res = await axios
                .post(AUTH_SERVER_URL + '/auth2/token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                });
            if (res.status === 201) {
                CookieStorage.saveEntireTokenResponse(res.data);
                axios.defaults.headers.common['Authorization'] =
                    'Bearer ' + CookieStorage.getAccessToken();
                return axios(originalRequest);
            }
        }
        return Promise.reject(error)
    }
)