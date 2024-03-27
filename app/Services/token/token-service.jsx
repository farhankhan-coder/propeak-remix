// app/controllers/tokenController.js

import { json } from '@remix-run/node';
import Token from '../../models/Token/token';

export async function removeUserTokens(userId) {
  try {
    if (userId) {
      await Token.deleteMany({ userId: userId });
    }
    return json({ success: true });
  } catch (error) {
    console.error('Error in removeUserTokens:', error);
    return json({ error: 'An error occurred while removing user tokens.' }, { status: 500 });
  }
}

export async function removeToken(token) {
  try {
    if (token) {
      await Token.findOneAndRemove({ token: token });
    }
    return json({ success: true });
  } catch (error) {
    console.error('Error in removeToken:', error);
    return json({ error: 'An error occurred while removing token.' }, { status: 500 });
  }
}

export async function updateToken(oldToken, newToken) {
  try {
    if (oldToken) {
      await Token.findOneAndUpdate(
        { token: oldToken },
        { $set: { token: newToken, updatedOn: Date.now() } }
      );
    }
    return json({ success: true });
  } catch (error) {
    console.error('Error in updateToken:', error);
    return json({ error: 'An error occurred while updating token.' }, { status: 500 });
  }
}

export async function getToken(){
const token=Token.find({})
return token;
}
export async function saveRefreshToken(accessToken, refreshToken, userId) {
  try {
    const token = await  Token.create({
      token: accessToken,
      refreshToken: refreshToken,
      userId: userId,
      createdOn: Date.now()
    });
    console.log(token, "token")
    // await token.save();
    return {token}; 
  } catch (error) {
    console.error('Error in saveRefreshToken:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}


export async function getRefreshTokenByAccessToken(token) {
  try {
    let res = await Token.findOne({ token: token }, { refreshToken: 1 });
    return res ? res.refreshToken : '';
  } catch (error) {
    console.error('Error in getRefreshTokenByAccessToken:', error);
    return '';
  }
}

export async function isValidRefreshToken(refreshToken) {
  try {
    let res = await Token.findOne({ refreshToken: refreshToken }, { refreshToken: 1 });
    return res && res.refreshToken ? true : false;
  } catch (error) {
    console.error('Error in isValidRefreshToken:', error);
    return false;
  }
}
