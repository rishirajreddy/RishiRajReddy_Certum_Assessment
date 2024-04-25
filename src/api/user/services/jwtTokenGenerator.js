import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  jwt_access_token_secret,
  jwt_refresh_token_secret,
} from "../../../../config/env.js";
export function generateAccessToken(user) {
  const token = JWT.sign(
    { id: user.id, email: user.email },
    jwt_access_token_secret,
    {
      expiresIn: "3d",
    }
  );

  return token;
}

export async function generateRefreshToken(user) {
  const token = JWT.sign(
    { id: user.id, email: user.email },
    jwt_refresh_token_secret,
    {
      expiresIn: "7d",
    }
  );

  //hash token
  const hashedToken = await bcrypt.hash(token, 10);
  const token_expiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return {
    refresh_token: token,
    hashedRefreshToken: hashedToken,
    token_expiration,
  };
}

// export default {
//   generateAccessToken,
//   generateRefreshToken,
// };
