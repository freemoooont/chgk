import express from "express";
import validator, { ValidationSource } from "../../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import UserRepo from "../../../database/repository/UserRepo";
import { Types } from "mongoose";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import authentication from "../../../auth/authetication";
import _ from "lodash";

const router = express.Router();

router.get(
  "/public/id/:id",
  validator(schema.userId, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findProfileById(
      new Types.ObjectId(req.params.id)
    );
    if (!user) throw new BadRequestError("User not registered");
    return new SuccessResponse("Success", {
      user: _.pick(user, ["name", "profilePicUrl", "roles"]),
    }).send(res);
  })
);

//Protected by access token
router.use("/", authentication);

router.get(
  "/my",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) throw new BadRequestError("User not registered");
    return new SuccessResponse("Success", {
      user: user,
    }).send(res);
  })
);
export default router;
