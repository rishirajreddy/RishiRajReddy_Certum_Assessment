import { errorResponse } from "../../../services/errorHandler.js";
import User from "../../user/models/user.js";
import Patient from "../models/patient.js";

export const find = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [{ model: User, as: "user" }],
    });
    return res.status(200).send(patients);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
