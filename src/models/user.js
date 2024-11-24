import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      required: true,
      enum: ['women', 'men'],
      default: 'women',
    },
    weight: {
      type: Number,
      default: 0,
      min: [0, 'Weight cannot be negative'],
    },
    activeTime: {
      type: Number,
      default: 0,
      min: [0, 'Active Time cannot be negative'],
    },
    dailyNorm: {
      type: Number,
      default: 1500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = mongoose.model('User', userSchema);
