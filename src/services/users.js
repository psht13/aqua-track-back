import { UserCollection } from '../models/user';

export const updateUser = async (userId, payload, waterId) => {
  try {
    const user = await UserCollection.findOneAndUpdate(
      {
        _id: userId,
        waterId: waterId,
      },
      payload,
      {
        new: true,
        includeResultMetadata: true,
      },
    );
    if (!rawResult || !rawResult.value) return null;
    return {
      user: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    throw new Error('Failed to update user');
  }
};
