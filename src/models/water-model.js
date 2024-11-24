import mongoose from 'mongoose';

const waterSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  curDailyDose: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
waterSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
const Water = mongoose.model('Water', waterSchema);

export default Water;
