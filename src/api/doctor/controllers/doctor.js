import Doctor from "../models/doctor.js";

export const find = async (req, res) => {
  try {
    const users = await Doctor.findAll({
      include: "user",
    });
    return res.status(200).send({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};
