import { OAuth2Client } from 'google-auth-library';
import createHttpError from 'http-errors';
const googleOauthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
});
export function generateOauthUrl() {
  return googleOauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}

export async function validateCode(code) {
  try {
    const response = await googleOauthClient.getToken(code);
    const ticket = await googleOauthClient.verifyIdToken({
      idToken: response.tokens.id_token,
    });
    return ticket;
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 499
    ) {
      throw createHttpError(401, 'Unauthorized');
    } else {
      throw error;
    }
  }
}
