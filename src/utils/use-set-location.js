import { createContext, useContext } from 'react';

export const SetLocationContext = createContext(null);

const useSetLocation = () => {
  return useContext(SetLocationContext);
};

export default useSetLocation;
