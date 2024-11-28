import {
  registerUser,
  loginUser,
  refreshSession,
  loginOrRegisterUser,
  logoutUser,
  requestResetPassword,
  resetPassword,
} from '../services/auth.js';
import { User } from '../models/user.js';
import { generateOauthUrl, validateCode } from '../utils/google-oauth.js';

/* Configures the settings for creating session cookies. */
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

/* Controller to register a new user. */
export async function registerController(req, res) {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await registerUser(payload);
  res.status(201).json({
    status: 201,
    message: 'User successfully registered!',
    data: registeredUser,
  });
}

/* Controller for user login. Sets session cookies and returns an accessToken. */
export async function loginController(req, res) {
  const { email, password } = req.body;
  const session = await loginUser(email, password);
  setupSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'User successfully logged in!',
    data: {
      accessToken: session.accessToken,
    },
  });
}
/* Controller for user logout.  */
export async function logoutController(req, res) {
  const { sessionId } = req.cookies;
  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).end();
}
/* Refresh Controller . Updates the user's refresh token by validating the existing refresh token
 * and issuing a new pair of access and refresh tokens. */

export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshSession(sessionId, refreshToken);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export const countController = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({
      status: 200,
      message: 'Total users count fetched successfully',
      totalUsers: userCount,
    });
  } catch (error) {
    next(error);
  }
};

export async function getOauthController(req, res) {
  const url = generateOauthUrl();
  res.send({
    status: 200,
    message: 'Successfully get Google OAuth URL',
    data: {
      url,
    },
  });
}

export async function confirmOauthController(req, res) {
  const { code } = req.body;
  const ticket = await validateCode(code);
  const session = await loginOrRegisterUser({
    email: ticket.payload.email,
    name: ticket.payload.name,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.send({
    status: 200,
    message: 'Login with Google successfully!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

/* Controller for resetting the user password. Sends the password reset link to the specified email. */
export async function resetPasswordController(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      status: 400,
      message: 'Email is required',
    });
  }
  await requestResetPassword(email);
  res.status(200).json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
}

/* Controller for resetting the user password. Updates the user password. */
export async function requestPasswordController(req, res) {
  const { password, token } = req.body;
  await resetPassword(password, token);
  res.json({
    status: 200,
    message: 'Your password has been successfully reset.',
    data: {},
  });
}
