import mongoose, { Document, Schema } from 'mongoose';

import { ContactsType } from '../types/all';

export type ContactDocument = Document & ContactsType;

export const ContactSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  name: {
    type: String,
    required: [true, 'Name is required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: [true, 'Email must be unique'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required field'],
    unique: [true, 'Phone number must be unique'],
  },
});

export default mongoose.model<ContactDocument>('Contact', ContactSchema);
