import mongoose, { Document } from 'mongoose';

import { UserType } from '../types/all';

export type UserDocument = Document & UserType;

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add the Username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please add the user email address'],
    unique: [true, 'Email address already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please add Password'],
    minlength: [6, 'Enter minimum 6 character password'],
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);
