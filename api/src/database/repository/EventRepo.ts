import Event, { EventModel } from "../model/Event";
import { Types } from "mongoose";
import Team from "../model/Team";
import { EventTypeCode } from "../model/Event";
import ChgkResult, {
  ChgkResultModel,
  GameResultStatusCode,
} from "../model/ChgkResult";
import { BadRequestError, InternalError } from "../../core/ApiError";

export default class EventRepo {
  private static CAPITAN_INFO_DATA = "name email profilePicUrl";
  private static TEAM_INFO = "name profilePicUrl";

  public static async create(event: Event): Promise<any> {
    const now = new Date();
    event.createdAt = event.updatedAt = now;
    const createdEvent = await EventModel.create(event);

    switch (event.code) {
      case EventTypeCode.ETAP: {
        const chgkPreResult: ChgkResult = {
          event: createdEvent._id,
          status: GameResultStatusCode.CLOSED,
        };
        await ChgkResultModel.create(chgkPreResult);
        break;
      }
      case EventTypeCode.SINHRON: {
        const chgkPreResult: ChgkResult = {
          event: event,
          status: GameResultStatusCode.CLOSED,
        };
        await ChgkResultModel.create(chgkPreResult);
        break;
      }
    }
    return createdEvent.toObject();
  }

  public static async update(event: Event): Promise<any> {
    event.updatedAt = new Date();
    return EventModel.updateOne({ _id: event._id }, { $set: { ...event } })
      .lean<Event>()
      .exec();
  }

  //TODO: Добавить пару полей с результатами
  public static async findInfoById(id: Types.ObjectId): Promise<Event | null> {
    return EventModel.findOne({ _id: id })
      .select("+registeredTeams +status")
      .populate({
        path: "registeredTeams",
        select: this.TEAM_INFO,
        populate: [
          {
            path: "capitan",
            select: this.CAPITAN_INFO_DATA,
          },
        ],
      })
      .lean<Event>()
      .exec();
  }

  //TODO: Проверить какую коллекцию будет возвразать и че по типизации получилось
  public static async findAll(): Promise<Event[] | null> {
    return EventModel.find().exec();
  }

  public static async addTeamById(
    team: Team,
    eventId: Types.ObjectId
  ): Promise<any> {
    //эта конструкция работает только с чгкшными эвентами
    const registeredTeams = await EventModel.findOne({ _id: eventId })
      .populate({
        path: "registeredTeams",
        match: { _id: team._id },
      })
      .select("+registeredTeams");

    // @ts-ignore
    const agent = registeredTeams.registeredTeams.find((obj) =>
      obj._id.equals(team._id)
    );

    if (agent) throw new BadRequestError("Team already registered");

    const eventResultInfo = await ChgkResultModel.findOne({
      // @ts-ignore
      event: eventId,
    }).exec();
    // @ts-ignore
    eventResultInfo.teamResults.push({
      team: team._id,
    });
    if (!eventResultInfo) throw new InternalError();
    await eventResultInfo.save();

    return EventModel.updateOne(
      { _id: eventId },
      { $push: { registeredTeams: team._id } }
    );
  }

  public static async findAllByCode(
    code: string
  ): Promise<Event[] | Event | null> {
    return EventModel.find({ code });
  }
}
