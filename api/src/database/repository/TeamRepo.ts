import { Types } from "mongoose";
import Team, { TeamModel } from "../model/Team";
import Role, { RoleCode, RoleModel } from "../model/Role";
import { InternalError } from "../../core/ApiError";
import User, { UserModel } from "../model/User";

export default class TeamRepo {
  public static findById(id: Types.ObjectId): Promise<Team | null> {
    return TeamModel.findOne({ _id: id, status: true })
      .populate("capitan", "name email profilePicUrl")
      .lean<Team>()
      .exec();
  }

  public static async create(team: Team): Promise<{ team: Team }> {
    const now = new Date();

    const capRole = await RoleModel.findOne({ code: RoleCode.CAPITAN })
      .select("+email +password")
      .lean<Role>()
      .exec();
    if (!capRole) throw new InternalError("Role must be defined");

    team.createdAt = team.updatedAt = now;
    const createdTeam = await TeamModel.create(team);
    await UserModel.updateOne(
      { _id: team.capitan._id },
      { $push: { roles: capRole._id } }
    );

    // @ts-ignore
    return { team: createdTeam.toObject() };
  }

  public static async findByCapitan(user: User): Promise<Team | null> {
    return await TeamModel.findOne({ capitan: user._id })
      .populate("capitan", "name email profilePicUrl")
      .lean<Team>()
      .exec();
  }

  public static async updateInfo(team: Team): Promise<any> {
    team.updatedAt = new Date();
    return TeamModel.updateOne({ _id: team._id }, { $set: { ...team } });
  }

  public static async findAll(): Promise<any> {
    return TeamModel.find();
  }
}
