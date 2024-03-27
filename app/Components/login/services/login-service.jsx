import User from "../../../models/user/user-model";


export const login = async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
    
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
      }
    
      return user;
    } catch (error) {
      console.error('Error in login:', error);
      return null;
    }
  };
