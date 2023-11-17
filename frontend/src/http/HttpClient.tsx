import axios from "axios";
import qs from "qs";
import {AccessTokenRead} from "../dto/AccessTokenRead";
import {UserRead} from "../dto/UserRead";
import {CookieStorage} from "../utils/CookieStorage";
import {UsersPage} from "../dto/UsersPage";

export const AUTH_SERVER_URL = "http://localhost:8081";
export const RESOURCE_SERVER_URL = "http://localhost:8080";
export const CLIENT_ID = "test-client";
export const CLIENT_SECRET = "secret";
export const REDIRECT_URI = "http://localhost:3000/me";

export default class HttpClient {
    static getAuthUrl(): string {
        return AUTH_SERVER_URL
            + "/oauth2/authorize?response_type=code"
            + "&client_id=" + CLIENT_ID
            + "&redirect_uri=" + REDIRECT_URI;
    }

    static async exchangeAuthCode(code: string): Promise<AccessTokenRead> {
        const response = await axios.post(
            AUTH_SERVER_URL + "/oauth2/token",
            qs.stringify({
                grant_type: "authorization_code",
                redirect_uri: REDIRECT_URI,
                code: code
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {username: CLIENT_ID, password: CLIENT_SECRET}
            });

        return response.data;
    }

    static async getMe(): Promise<UserRead> {
        const response = await axios
            .get(
                RESOURCE_SERVER_URL + "/users/me",
                {
                    headers: {'Authorization': 'Bearer ' + CookieStorage.getAccessToken()},
                });
        return response.data;
    }

    static async getAdmin(): Promise<UserRead> {
        const response = await axios
            .get(
                RESOURCE_SERVER_URL + "/users/admin",
                {
                    headers: {'Authorization': 'Bearer ' + CookieStorage.getAccessToken()},
                });
        return response.data;
    }

    static async getUsers(): Promise<UsersPage> {
        const response = await axios
            .get(
                RESOURCE_SERVER_URL + "/users",
                {
                    headers: {'Authorization': 'Bearer ' + CookieStorage.getAccessToken()},
                });
        return response.data;
    }

    static async searchUsers(query: string): Promise<UserRead[]> {
        const response = await axios
            .get(
                RESOURCE_SERVER_URL + "/users/search?query=" + query,
                {
                    headers: {'Authorization': 'Bearer ' + CookieStorage.getAccessToken()},
                });
        return response.data;
    }

    static async logout() {
        await axios.post(
            AUTH_SERVER_URL + "/logout",
            null,
            {
                headers: {'Authorization': 'Bearer ' + CookieStorage.getAccessToken()},
            })
    }

    static async register(username: string, password: string) {
        await axios.post(
            AUTH_SERVER_URL + "/users/register",
            {
                username: username,
                password: password
            },
            {
                headers: {'Content-Type': 'application/json'}
            })
    }
}