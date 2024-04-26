import Joi from "joi";
import { errorResponse } from "../../../services/errorHandler.js";

export const appoinmentValidation = async (req, res, next) => {
  const JoiSchema = Joi.object({
    doctor_id: Joi.required(),
    appointment_date: Joi.string().required(),
  });
  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(
      errorResponse({
        message: result.error.message,
        details: result.error.details,
      })
    );
  }

  await next();
};
