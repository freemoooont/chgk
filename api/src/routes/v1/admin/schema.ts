import Joi from "@hapi/joi";
import {EventTypeCode} from "../../../database/model/Event";

export default {
    eventCreate: Joi.object().keys({
        name: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(3).max(2000),
        code: Joi.string().required().valid(EventTypeCode.SINHRON, EventTypeCode.ETAP, EventTypeCode.TRAINING, EventTypeCode.KNOPKI),
        startDate: Joi.date().min('now'),
        place: Joi.string().required().min(4).max(15),
        questionAmount: Joi.number().optional().positive().min(2),
        questionInTour: Joi.number().optional().min(1),
        picUrl: Joi.string().optional().uri().max(200)
    })
}