// middleware/grantAccess.js

import jwt from 'jsonwebtoken';
import secret from '../config/secret';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../common/const';

export async function grantAccess(request, token, refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret.secret, async function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          jwt.verify(refreshToken, secret.secretRefreshToken, async function (err, decoded) {
            if (err) {
              // Handle error
              reject(new Error('Token Expired Error'));
            }

            // Generate a new access token
            const u = decoded.user;
            const newToken = generateAccessToken(u);
            // Update request with new token
            updateRequest(request, decoded, newToken, refreshToken);
            resolve();
          });
        } else {
          // Handle authentication failure
          reject(new Error('Failed to authenticate token'));
        }
      } else {
        // Set user information on the request
        request.user = decoded.user;
        resolve();
      }
    });
  });
}
