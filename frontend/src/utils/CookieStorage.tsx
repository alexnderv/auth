import {AccessTokenRead} from "../dto/AccessTokenRead";
import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const ACCESS_TOKEN_EXPIRES_AT_KEY = 'access_token_expires_at';

export class CookieStorage {
    static getAccessToken(): string | undefined {
        return Cookies.get(ACCESS_TOKEN_KEY);
    }

    static getRefreshToken(): string | undefined {
        return Cookies.get(REFRESH_TOKEN_KEY);
    }

    static getAccessExpiresAt(): string | undefined {
        return Cookies.get(ACCESS_TOKEN_EXPIRES_AT_KEY);
    }

    static hasNoToken(): boolean {

        console.log("token " + Cookies.get(ACCESS_TOKEN_KEY))

        return Cookies.get(ACCESS_TOKEN_KEY) === null;
    }

    static saveEntireTokenResponse(tokenResponse: AccessTokenRead) {
        console.log(tokenResponse.access_token);
        Cookies.set(ACCESS_TOKEN_KEY, tokenResponse.access_token);
        Cookies.set(REFRESH_TOKEN_KEY, tokenResponse.refresh_token);
    }
}