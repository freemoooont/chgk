import express from 'express'
import validator from "../../../helpers/validator";
import asyncHandler from "../../../helpers/asyncHandler";
import {RoleRequest} from "app-request";
import {RoleCode} from "../../../database/model/Role";
import UserRepo from "../../../database/repository/UserRepo";
import User from "../../../database/model/User"
import {BadRequestError} from "../../../core/ApiError";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {createTokens} from "../../../auth/authUtils";
import {SuccessResponse} from "../../../core/ApiResponse";
import _ from "lodash";
import schema from "./schema";

const router = express.Router();

router.post(
    '/basic',
    validator(schema.signup),
    asyncHandler(async(req: RoleRequest, res)=>{
        const user = await UserRepo.findByEmail(req.body.email)
        if (user) throw new BadRequestError('User already exist')

        const accessTokenKey = crypto.randomBytes(64).toString('hex');
        const refreshTokenKey = crypto.randomBytes(64).toString('hex');
        const passwordHash = await bcrypt.hash(req.body.password,10);

        const {user: createdUser, keystore} = await UserRepo.create(
            {
                    name: req.body.name,
                    email: req.body.email,
                    profilePicUrl: req.body.profilePicUrl,
                    password: passwordHash,
            } as User,
            accessTokenKey,
            refreshTokenKey,
            RoleCode.USER
        );

        const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
        new SuccessResponse('Signup Successful',{
                user: _.pick(createdUser, ['_id', 'name', 'email', 'roles', 'profilePicUrl']),
                tokens: tokens
        }).send(res)
    }),
);

export default router