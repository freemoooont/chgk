import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import TeamRepo from "../../../database/repository/TeamRepo";
import Team from "../../../database/model/Team";
import { SuccessResponse } from "../../../core/ApiResponse";
import { Types } from "mongoose";
import User from "../../../database/model/User";
import { BadRequestError } from "../../../core/ApiError";

const router = express.Router();
//TODO: Валидатор
router.post(
  "/",
  asyncHandler(async (req: ProtectedRequest, res) => {
    //TODO: Проверить, че ебанулось
    // const existTeam = TeamRepo.findByCapitan({
    //   _id: Types.ObjectId(req.user._id),
    // } as User);
    // console.log(existTeam);
    // if (existTeam) throw new BadRequestError("You already have a team");

    const createdTeam = await TeamRepo.create({
      name: req.body.name,
      capitan: req.user,
      teamMates: req.body.teamMates,
      profilePicUrl: req.body.profilePicUrl,
    } as Team);
    new SuccessResponse("Team created successful", createdTeam).send(res);
  })
);

export default router;
