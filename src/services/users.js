import { User } from '../models/user.js';

export const updateUser = async (userId, payload) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      payload,
      {
        new: true,
        upsert: false,
      },
    );
    if (!user) return null;
    return {
      user,
      isNew: false,
    };
  } catch (error) {
    throw new Error('Failed to update user');
  }
};
