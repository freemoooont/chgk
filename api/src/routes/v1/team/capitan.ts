import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import TeamRepo from "../../../database/repository/TeamRepo";
import { Types } from "mongoose";
import { BadRequestError, InternalError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";
import authetication from "../../../auth/authetication";
import role from "../../../helpers/role";
import { RoleCode } from "../../../database/model/Role";
import authorization from "../../../auth/authorization";
import User from "../../../database/model/User";
import ChgkResultRepo from "../../../database/repository/ChgkResultRepo";
import EventRepo from "../../../database/repository/EventRepo";

const router = express.Router();

router.use("/", authetication, role(RoleCode.CAPITAN), authorization);
//TODO: Валидатор
router.put(
  "/update",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const team = await TeamRepo.findByCapitan({
      _id: Types.ObjectId(req.user._id),
    } as User);
    if (team == null) throw new BadRequestError("Team does not exist");
    if (req.body.name) team.name = req.body.name;
    if (req.body.profilePicUrl) team.profilePicUrl = req.body.profilePicUrl;
    if (req.body.teamMates) team.teamMates = req.body.teamMates;

    await TeamRepo.updateInfo(team);

    new SuccessResponse("Team updated successful", team).send(res);
  })
);

//Возможно, этот эндпоинт потом будет другим

router.get(
  "/my",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const team = await TeamRepo.findByCapitan({
      _id: Types.ObjectId(req.user._id),
    } as User);
    if (team == null) throw new InternalError();
    const allResults = await ChgkResultRepo.findResultsByTeam(team);
    const data = {
      teamInfo: team,
      eventResults: allResults,
    };
    new SuccessResponse("Your team", data).send(res);
  })
);

router.get(
  "/my/short",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const team = await TeamRepo.findByCapitan({
      _id: Types.ObjectId(req.user._id),
    } as User);
    if (team == null) throw new InternalError();
    new SuccessResponse("Your team", team).send(res);
  })
);

router.put(
  "/register/event/:id",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const team = await TeamRepo.findByCapitan(req.user);

    if (!team) throw new BadRequestError("Team does not exist");

    await EventRepo.addTeamById(team, Types.ObjectId(req.params.id));

    return new SuccessMsgResponse("Team registered successful").send(res);
  })
);

export default router;
