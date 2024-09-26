import { NextFunction, Request, Response } from 'express';

import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import { BadRequest, NotFound } from '../utils/CustomError';
import UserModel, { UserDocument } from '../model/UserModel';
import userService from '../services/userService';
import {
  comparePassword,
  generateTokens,
  HashPassword,
} from '../utils/AuthUtil';
import { JwtToken } from '../types/all';

// @desc Register a new user
// @route POST /api/v1/users/register
// @access public
export const registerUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new BadRequest('Incomplete user register data');
    }

    if (password && password.length < 6) {
      throw new BadRequest('Password must be at least 6 characters long');
    }

    const hashedPassword = await HashPassword(password);

    const userData: UserDocument = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const newUser: UserDocument = await userService.registerUser(userData);

    return res.status(201).json(newUser);
  }
);

// @desc Login user
// @route POST /api/v1/users/login
// @access public
export const loginUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequest('Incomplete login data');
    }

    const user: UserDocument | null = await userService.getUserByEmail(email);

    if (user) {
      const isMatch = await comparePassword(password, user.password as string);

      if (!isMatch) {
        throw new BadRequest('Password did not match');
      }

      const token: JwtToken = await generateTokens(user);
      res.status(200).json(token);
    } else {
      throw new NotFound('User does not exist');
    }
  }
);

// @desc Current user info
// @route GET /api/v1/users/current
// @access private
export const currentUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(req.user);
  }
);
