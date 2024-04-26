import Joi from "joi";
import { errorResponse } from "../../../services/errorHandler.js";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    phone: Joi.string().required(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    pincode: Joi.string(),
    dob: Joi.string(),
    gender: Joi.string(),
    user_type: Joi.string(),
    speciality: Joi.string().when("user_type", {
      is: "DOCTOR",
      then: Joi.required(),
    }),
    type: Joi.string().when("user_type", {
      is: "DOCTOR",
      then: Joi.required(),
    }),
    availability_start: Joi.string().when("user_type", {
      is: "DOCTOR",
      then: Joi.required(),
    }),
    availability_end: Joi.string().when("user_type", {
      is: "DOCTOR",
      then: Joi.required(),
    }),
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

export const verifyOTPValidation = async (req, res, next) => {
  const JoiSchema = Joi.object({
    phone: Joi.string().required(),
    otp: Joi.string().required(),
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

export const loginValidation = async (req, res, next) => {
  const JoiSchema = Joi.object({
    phone: Joi.string().required(),
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
