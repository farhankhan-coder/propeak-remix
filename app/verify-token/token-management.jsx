import secret from '../config/secret';
import jwt from 'jsonwebtoken';
import config from "../config/config";
import Token from '../models/Token/token';

export function generateAccessToken(val) {
    return jwt.sign(val, secret.secret, {
        expiresIn: config.tokenExpiry
    });
}
export async function verifyAccessToken(accessToken) {
    try {
        const decodedToken = jwt.verify(accessToken, secret.secret);
        
        return decodedToken;
    } catch (error) {
        console.error('Error verifying access token:', error);
        throw new Error('Invalid access token');
    }
  }
export function generateRefreshToken(u) {
    return jwt.sign({ user: u }, secret.secretRefreshToken, {
        expiresIn: config.refreshTokenExpiry
    });
}

export function decodeToken(t) {
    return jwt.decode(t);
}

export function decodeRefreshToken(t) {
    return jwt.decode(t);
}
export async function saveRefreshToken(accessToken, refreshToken, userId) {
    try {
        const token = await Token.create({
            token: accessToken,
            refreshToken: refreshToken,
            userId: userId,
            createdOn: Date.now()
        });
        console.log('Refresh token saved:', token);
        return token;
    } catch (error) {
        console.error('Error saving refresh token:', error);
        throw error;
    }
}
// export async function saveRefreshToken(token, refreshToken, userId) {
//     try {
//         await Token.create({ token, refreshToken, userId });
//     } catch (error) {
//         console.error("Error saving refresh token:", error);
//     }
// }

export async function removeToken(token) {
    try {
        await Token.deleteOne({ token });
    } catch (error) {
        console.error("Error removing token:", error);
    }
}
