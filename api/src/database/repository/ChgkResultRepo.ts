import ChgkResult, {ChgkResultModel, GameResultStatusCode} from "../model/ChgkResult";
import Event from "../model/Event";
import Team from "../model/Team";

export default class ChgkResultRepo{
    private event: Event;

    constructor(event: Event) {
        this.event = event
    }

    public static async createPreResultByEvent(
        event: Event
    ) :Promise<any> {
        const chgkPreResult: ChgkResult = {
            event,
            status: GameResultStatusCode.CLOSED
        }
       return await ChgkResultModel.create(chgkPreResult);
    }

    //TODO: возможно придется переделать на айдишник, а не на целый объект. Хуй знает как будет работать! Не забудь проверить
    public static async ChangeGameStatusByEvent(
        code: string,
        event: Event
    ) :Promise<any>{
        return ChgkResultModel.updateOne({event: event}, {$set: {GameResultStatusCode: code}})
    }

    public static async updateAllResultByEvent(
        results: ChgkResult,
        event: Event
    ) :Promise<any>{
        return ChgkResultModel.updateOne({event}, {$set: {...results}}).lean<ChgkResult>().exec()
    }
    //TODO: Проверить как работает поиск по вложенным документам и еслч уебать жестко
    //TODO: ДОБАВИТЬ ПОИСК ПО КОНКРЕТНОМУ ЭВЕНТУ В ЭТОТ МЕТОД
    public static async findResultByTeam(
        team: Team
    ):Promise<any>{
        return ChgkResultModel.findOne({'teamResults.team' : team})
            .populate('team')
            .lean<ChgkResult>()
            .exec()
    }

    public static async findAllResultByEvent(
        event: Event
    ): Promise<any> {
        return ChgkResultModel.findOne({event})
            .lean<ChgkResult>()
            .exec()
    }
}