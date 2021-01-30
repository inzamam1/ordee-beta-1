//setup data layer to pass information of basket of each user
//global variable to be used by comonents at lower level
import React, { createContext, useContext, useReducer } from "react";
//this is data layer
export const StateContext = createContext();

//Build a provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//This is how we use it inside of a component
export const useStateValue = () => useContext(StateContext);
