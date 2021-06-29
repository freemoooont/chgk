import express from "express";
import validator, {ValidationSource} from "../../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import {createTokens, getAccessToken, validateTokenData} from "../../../auth/authUtils";
import JWT from "../../../core/JWT";
import UserRepo from "../../../database/repository/UserRepo";
import { Types } from "mongoose"
import {AuthFailureError} from "../../../core/ApiError";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import crypto from "crypto"
import {TokenRefreshResponse} from "../../../core/ApiResponse";

const router = express.Router();

router.post(
    '/refresh',
    validator(schema.auth, ValidationSource.HEADER),
    validator(schema.refreshToken),
    asyncHandler(async(req:ProtectedRequest,res)=>{
        req.accessToken = getAccessToken(req.headers.authorization);

        const accessTokenPayload = await JWT.decode(req.accessToken);
        validateTokenData(accessTokenPayload);

        const user = await UserRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
        if (!user) throw new AuthFailureError('User not registered');
        req.user = user;

        const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
        validateTokenData(refreshTokenPayload);

        if(accessTokenPayload.sub !== refreshTokenPayload.sub) {
                throw new AuthFailureError('Invalid access token');
        }

        const keystore = await KeystoreRepo.find(
            req.user._id,
            accessTokenPayload.prm,
            refreshTokenPayload.prm,
        );

        if (!keystore) throw new AuthFailureError('Invalid access token');
            await KeystoreRepo.remove(keystore._id);

        const accessTokenKey = crypto.randomBytes(64).toString('hex');
        const refreshTokenKey = crypto.randomBytes(64).toString('hex');

        await KeystoreRepo.create(req.user._id, accessTokenKey, refreshTokenKey);

        const tokens = await createTokens(user,accessTokenKey,refreshTokenKey);

        new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
    }),
);

export default router;