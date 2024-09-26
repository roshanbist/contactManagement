import UserModel, { UserDocument } from '../model/UserModel';
import { BadRequest } from '../utils/CustomError';

const registerUser = async (userData: UserDocument): Promise<UserDocument> => {
  const existingUser = await getUserByEmail(userData.email as string);

  if (existingUser) {
    throw new BadRequest('User already registered');
  }

  return await userData.save();
};

const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return await UserModel.findOne({ email: email });
};

export default { registerUser, getUserByEmail };
