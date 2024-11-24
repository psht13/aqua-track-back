import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Woman', 'Man'],
      default: 'Woman',
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    activeTime: {
      type: Number,
      default: 0,
    },
    dailyNorm: {
      type: Number,
      default: 1500,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
