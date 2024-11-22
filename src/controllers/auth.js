import { registerUser, loginUser } from '../services/auth.js';
import { User } from '../models/user.js';

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
