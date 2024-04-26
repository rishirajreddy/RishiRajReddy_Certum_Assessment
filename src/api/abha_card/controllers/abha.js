import { errorResponse } from "../../../services/errorHandler.js";
import Patient from "../../patient/models/patient.js";
import User from "../../user/models/user.js";
import Abha from "../models/abha.js";

export const createAbha = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { UserID: req.data.id } });
    const { abha_address, abha_number } = req.body;
    const abha = await Abha.create({
      PatientId: patient.id,
      abha_address,
      abha_number,
    });

    return res.status(200).send(abha);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const find = async (req, res) => {
  try {
    const data = await Abha.findAll({
      include: {
        model: Patient,
        as: "patient",
        include: {
          model: User,
          as: "user",
          attributes: { exclude: ["otp", "otp_expiration"] },
        },
      },
    });

    return res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
