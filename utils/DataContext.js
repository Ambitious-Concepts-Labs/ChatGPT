import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {

    const [navIsOpen, setNavIsOpen] = useState(false)

  return (
    <DataContext.Provider
      value={{
        navIsOpen
        }}
    >
      {props.children}
    </DataContext.Provider>
  );
};