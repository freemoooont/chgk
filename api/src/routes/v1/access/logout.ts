import express from "express";
import authetication from "../../../auth/authetication";
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import {SuccessMsgResponse} from "../../../core/ApiResponse";

const router = express.Router();

router.use('/', authetication);

router.delete(
    '/',
    asyncHandler(async(req:ProtectedRequest, res)=>{
        await KeystoreRepo.remove(req.keystore._id);
        new SuccessMsgResponse('Logout response').send(res);
    })
)

export default router