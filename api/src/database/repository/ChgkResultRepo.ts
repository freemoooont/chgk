import ChgkResult, {
  ChgkResultModel,
  GameResultStatusCode,
} from "../model/ChgkResult";
import Event from "../model/Event";
import Team, { TeamModel } from "../model/Team";
import OverallPlacesChanger from "../../core/OverallPlacesChanger";

export default class ChgkResultRepo {
  private event: Event;

  constructor(event: Event) {
    this.event = event;
  }

  public static async createPreResultByEvent(event: Event): Promise<any> {
    const chgkPreResult: ChgkResult = {
      event,
      status: GameResultStatusCode.CLOSED,
    };
    return await ChgkResultModel.create(chgkPreResult);
  }

  public static async ChangeChgkResultStatusByEvent(
    code: string,
    event: Event
  ): Promise<any> {
    const results = await this.findAllResultByEvent(event);
    if (code == GameResultStatusCode.CLOSED && results) {
      const allTeamsResults = results.teamResults;
      if (allTeamsResults) {
        //TODO: Здесь рейтинг для команды в общем зачете сезона необходимо считать от итогого места в командае
        const rating = allTeamsResults.map((team) => ({
          team: team.team,
          rating: team.rating,
        }));
        rating.map(async (obj) => {
          await TeamModel.updateOne(
            { _id: obj.team._id },
            { $set: { rating: obj.rating } }
          );
        });
      }

      const teams = await TeamModel.find().lean<Team[]>().exec();
      const result = OverallPlacesChanger(teams);
      result.map(async (obj) => {
        await TeamModel.updateOne(
          { _id: obj._id },
          { $set: { overallPlace: obj.overallPlace } }
        );
      });
    }

    return ChgkResultModel.updateOne(
      { event: event },
      { $set: { status: code } }
    );
  }

  public static async updateAllResultByEvent(
    results: ChgkResult,
    event: Event
  ): Promise<any> {
    return ChgkResultModel.updateOne({ event }, { $set: { ...results } })
      .lean<ChgkResult>()
      .exec();
  }
  //TODO: Проверить как работает поиск на нескольких эвентах
  public static async findResultsByTeam(team: Team): Promise<any> {
    return ChgkResultModel.aggregate([
      {
        $match: { "teamResults.team": { $eq: team._id } },
      },
      {
        $unwind: "$teamResults",
      },
      {
        $match: { "teamResults.team": { $eq: team._id } },
      },
      {
        //TODO: удалить лишние поля из эвента
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventInfo",
        },
      },
      {
        $project: {
          place: "$teamResults.place",
          rightAnswers: "$teamResults.rightAnswers",
          questionResult: "$teamResults.questionResult",
          rating: "$teamResults.rating",
          playersOnGame: "$teamResults.playersOnGame",
          eventInfo: "$eventInfo",
        },
      },
    ]);
  }

  public static async findAllResultByEvent(event: Event): Promise<ChgkResult> {
    return ChgkResultModel.findOne({ event })
      .populate({
        path: "teamResult",
        populate: {
          path: "team",
        },
      })
      .lean<ChgkResult>()
      .exec();
  }
}
