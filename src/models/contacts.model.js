import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    photo: { type: String, default: null },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contacts', contactSchema);
