import {
  findbyEmail,
  UserDetails
} from '../Repository/UserRepo.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../Utils/jwt.js';


export const signUpService = async (data) => {
  try {
    // Check if user already exists
    const existingUser = await findbyEmail(data.email);
    if (existingUser) {
      const error = new Error('User already exists with this email');
      error.statusCode = 409;
      throw error;
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Create a new user
    const user = await UserDetails({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });

    return user;
  } catch (error) {
    console.error('UserService Error:', error.message);
    throw error;
  }
};

export const loginService = async (data) => {
  try {
    const user = await findbyEmail(data.email);

    if (!user) {
      const error = new Error('User does not exist');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      id: user.id,
      email: user.email
    });

    return {
      token,
      user
    };
  } catch (error) {
    console.error('UserService Error:', error.message);
    throw error;
  }
};
