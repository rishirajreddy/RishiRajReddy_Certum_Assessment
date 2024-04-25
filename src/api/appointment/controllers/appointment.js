import { errorResponse } from "../../../services/errorHandler.js";
import { getPagination } from "../../../utils/helpers.js";
import Doctor from "../../doctor/models/doctor.js";
import User from "../../user/models/user.js";
import Appointment from "../models/appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctor_id, appointment_date } = req.body;

    //check doctor exists
    const doctor = await Doctor.findByPk(doctor_id);
    console.log(doctor);
    if (!doctor) {
      return res.status(400).send(
        errorResponse({
          status: 400,
          message: `Doctor with ID${doctor_id} doesnot exist`,
        })
      );
    }
    const patient_id = req.data.id;
    const appointment = await Appointment.create({
      DoctorId: doctor_id,
      PatientId: patient_id,
      appointment_date,
      status: "SCHEDULED",
    });
    return res.status(200).send(appointment);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const patient_id = req.data.id;
    const pagination = req.query.pagination;
    const { limit, offset } = getPagination(pagination);
    const appointments = await Appointment.findAll({
      where: { PatientId: patient_id },
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: {
            model: User,
            as: "user",
            attributes: { exclude: ["otp", "otp_expiration"] },
          },
        },
      ],
      offset,
      limit,
    });

    return res.status(200).send(appointments);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const getAppointmentDoctors = async (req, res) => {
  try {
    const patient_id = req.data.id;

    const appointments = await Appointment.findAll({
      where: { PatientId: patient_id },
      include: [
        {
          model: Doctor,
          as: "doctor",
          include: {
            model: User,
            as: "user",
            attributes: { exclude: ["otp", "otp_expiration"] },
          },
        },
      ],
    });

    const doctors = appointments.map((it) => it.doctor);
    return res.status(200).send(doctors);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
