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
  // TODO get actual user data from middleware
  const user = {
    _id: 'test',
    dailyDose: 1.5,
  };
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
  // TODO get actual user data from middleware
  const user = {
    _id: 'test',
    dailyDose: 1.5,
  };
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
  const user = {
    _id: 'test',
    dailyDose: 1.5,
  };
  const { amount, date } = req.body;

  const response = await addWaterRecord({ amount, date }, user);
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: response,
  });
};
export const updateWaterRecordController = async (req, res, next) => {
  const user = {
    _id: 'test',
    dailyDose: 1.5,
  };
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
  const user = {
    _id: 'test',
    dailyDose: 1.5,
  };
  const { id } = req.params;
  const response = await deleteWaterRecord(id, user);
  if (!response) throw httpErrors(404, 'This record is not found');
  res.status(204).send();
};
