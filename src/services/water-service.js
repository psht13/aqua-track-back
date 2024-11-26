import httpErrors from 'http-errors';
import Water from '../models/water-model.js';

export const addWaterRecord = async (waterData, user) => {
  waterData.userId = user.id ?? 'unkown';
  waterData.curDailyDose = user.dailyNorm ?? 1500;
  const water = new Water(waterData);
  return await water.save();
};
export const updateWaterRecord = async (id, waterData, user) => {
  const water = await Water.findById(id);
  if (!water || water.userId != user.id)
    throw httpErrors(404, "Water record doesn't exist");
  if (waterData.amount) {
    water.amount = waterData.amount;
  }
  if (waterData.date) {
    water.date = waterData.date;
  }
  await water.save();
  return water;
};
export const getWaterByInterval = async (from, to, user) => {
  const water = await Water.find({
    date: {
      $gte: from,
      $lte: to,
    },
    userId: user.id,
  });
  const output = [];
  water.forEach((e) => {
    output.push({
      id: e._id,
      date: e.date,
      amount: e.amount,
      percent: calculateDailyDosePercent(e.amount, e.curDailyDose),
      curDailyDose: e.curDailyDose,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    });
  });
  return output;
};
/**
 * Returns the percent of drunk water based on daily dose of water. Rounded to integer number
 * @param {*} drunkAmount amount of water drunk (In ml)
 * @param {*} dailyDose daily dose of water to be drunk (In ml)
 * @returns A number in percent format, where 100 equals 100% and 0 equals 0%
 * @example 31
 * @min 0
 * @max 100
 */
const calculateDailyDosePercent = (drunkAmount, dailyDose) => {
  return Math.round((drunkAmount / dailyDose) * 100);
};
/**
 * Returns a water drunk by a day from 00:00 midnight to 23:59:59
 * @param {*} day day in date format.
 * @param {*} user object of an aunthenticated user
 * @returns A list of items containing the information of drunk water
 */
export const getWaterByDay = async (day, user) => {
  const water = await Water.find({
    date: {
      $gte: new Date(day).setHours(0, 0, 0, 0),
      $lte: new Date(day).setHours(23, 59, 59, 999),
    },
    userId: user.id,
  });
  const output = [];
  water.forEach((e) => {
    output.push({
      id: e._id,
      date: e.date,
      amount: e.amount,
      percent: calculateDailyDosePercent(e.amount, e.curDailyDose),
      curDailyDose: e.curDailyDose,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    });
  });
  return output;
};
export const deleteWaterRecord = async (id, user) => {
  await Water.findOneAndDelete({ _id: id, userId: user.id });
};
