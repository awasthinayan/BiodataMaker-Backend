import user from '../Schema/Userauth.js';

export const UserDetails = async (userData) => {
  try {
    return await user.create(userData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findbyEmail = async (email) => {
  try {
    return await user.findOne({ email });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
