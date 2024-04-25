import JWT from "jsonwebtoken";
import {
  jwt_access_token_secret,
  jwt_refresh_token_secret,
} from "../../config/env.js";
export function issue(payload) {
  try {
    const token = JWT.sign(payload, jwt_access_token_secret, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
export function verifyJWT(req) {
  try {
    if (req.headers.hasOwnProperty("authorization")) {
      const token = req.headers.authorization.split(" ")[1];
      const data = JWT.verify(token, jwt_access_token_secret);
      return data;
    } else {
      return { error: "No Bearer token pass in request" };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export function verifyJWTRefresh(token) {
  try {
    const data = JWT.verify(token, jwt_refresh_token_secret);
    return {data: data};
  } catch (error) {
    return {error: error.message};
  }
}
