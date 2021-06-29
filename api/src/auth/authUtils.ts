import {AuthFailureError, InternalError} from "../core/ApiError";
import JWT, {JwtPayload} from "../core/JWT";
import {tokenInfo} from "../config";
import {Types} from "mongoose";
import {Tokens} from "app-request";
import User from "../database/model/User";

export const getAccessToken = (authorization?: string) => {
    if (!authorization) throw new AuthFailureError('Invalid authorization');
    if (!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid authorization');
    return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
    if(
        !payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        payload.iss !== tokenInfo.issuer ||
        payload.aud !== tokenInfo.audience ||
        !Types.ObjectId.isValid(payload.sub)
    )
        throw new AuthFailureError('Invalid Access Token');
    return true;
};


export const createTokens = async (
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
): Promise<Tokens> => {
    const accessToken = await JWT.encode(
        new JwtPayload(
            tokenInfo.issuer,
            tokenInfo.audience,
            user._id.toString(),
            accessTokenKey,
            tokenInfo.refreshTokenValidityDays,
        )
    );

    if (!accessToken) throw new InternalError();

    const refreshToken = await JWT.encode(
        new JwtPayload(
            tokenInfo.issuer,
            tokenInfo.audience,
            user._id.toString(),
            refreshTokenKey,
            tokenInfo.refreshTokenValidityDays,
        )
    );

    if (!refreshToken) throw new InternalError();

    return{
        accessToken: accessToken,
        refreshToken: refreshToken,
    } as Tokens
}