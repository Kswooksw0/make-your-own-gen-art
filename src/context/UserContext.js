import { createContext, useContext } from 'react';

// Create a context
const UserContext = createContext();

// Export a custom hook to access the context value
export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
