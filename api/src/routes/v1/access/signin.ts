import express from "express";
import validator from "../../../helpers/validator";
import asyncHandler from "../../../helpers/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import {AuthFailureError, BadRequestError} from "../../../core/ApiError";
import bcrypt from "bcrypt";
import crypto from "crypto"
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import {SuccessResponse} from "../../../core/ApiResponse";
import _ from "lodash"
import {createTokens} from "../../../auth/authUtils";
import schema from "./schema";

const router = express.Router();

router.post(
    '/basic',
    validator(schema.userCredential),
    asyncHandler(async(req,res)=>{
        const user = await UserRepo.findByEmail(req.body.email);
        if (!user) throw new BadRequestError('User not registered');
        if (!user.password) throw new BadRequestError('Credential not set');

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new AuthFailureError("Authentication failure");

        const accessTokenKey = crypto.randomBytes(64).toString('hex');
        const refreshTokenKey = crypto.randomBytes(64).toString('hex');

        await KeystoreRepo.create(user, accessTokenKey, refreshTokenKey);
        const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

        new SuccessResponse('Login success', {
            user: _.pick(user, ['_id','name','roles','profilePicUrl']),
            tokens: tokens,
            }).send(res)
    })
)

export default router
