import JWT from "jsonwebtoken";
import { jwt_access_token_secret } from "../../config/env.js";
import { errorResponse } from "../services/errorHandler.js";

export function verifyJWT(req, res, next) {
  try {
    if (req.headers.hasOwnProperty("authorization")) {
      const token = req.headers.authorization.split(" ")[1];
      const data = JWT.verify(token, jwt_access_token_secret);
      req.data = data;
      return next();
    } else {
      return res.status(403).send(
        errorResponse({
          status: 403,
          message: "No Bearer token pass in request",
        })
      );
    }
  } catch (error) {
    return res.status(403).send(
      errorResponse({
        status: 403,
        message: error.message,
      })
    );
  }
}
