import Joi from "joi";
import { errorResponse } from "../../../services/errorHandler.js";
import Patient from "../../patient/models/patient.js";
import Abha from "../models/abha.js";

export const checkAbhaCardExist = async (req, res, next) => {
  const patient = await Patient.findOne({
    where: { UserID: req.data.id },
  });

  const abha = await Abha.findOne({ where: { PatientId: patient.id } });

  if (abha) {
    return res.status(400).send(
      errorResponse({
        status: 400,
        message: "Abha Card Already exists for the user",
      })
    );
  }
  await next();
};

export const abhaInputValidation = async (req, res, next) => {
  const JoiSchema = Joi.object({
    abha_address: Joi.string().regex(/abdm$/).required(),
    abha_number: Joi.string().length(14).required(),
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
