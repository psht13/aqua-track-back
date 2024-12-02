import createError from 'http-errors';
import {
  addWaterRecord,
  deleteWaterRecord,
  getWaterByDay,
  getWaterByInterval,
  updateWaterRecord,
} from '../services/water-service.js';
import httpErrors from 'http-errors';

export const getWaterByIntervalController = async (req, res, next) => {
  const user = req.user;
  const { from, to } = req.query;
  const response = await getWaterByInterval(from, to, user);
  res.status(200).json({
    status: 200,
    from: from,
    to: to,
    message: 'Success',
    total: response.length,
    data: response,
  });
};
export const getWaterByDayController = async (req, res, next) => {
  const user = req.user;
  const { day } = req.query;
  const response = await getWaterByDay(day, user);
  res.status(200).json({
    status: 200,
    message: 'Success',
    total: response.length,
    data: response,
  });
};
export const addWaterRecordController = async (req, res, next) => {
  const user = req.user;
  const { amount, date } = req.body;

  const response = await addWaterRecord({ amount, date }, user);
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: response,
  });
};
export const updateWaterRecordController = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const { amount, date } = req.body;
  const response = await updateWaterRecord(id, { amount, date }, user);
  res.status(200).json({
    status: 200,
    message: 'Success',
    data: response,
  });
};
export const deleteWaterRecordController = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  await deleteWaterRecord(id, user);
  res.status(204).send();
};
