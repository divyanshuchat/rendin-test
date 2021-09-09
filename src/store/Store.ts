import React from "react";
export const initialState = {
  userLoggedIn: false,
  isLoggedIn: false,
  userInfo: null,
};

export const reducer = (state: any, action: any) => {
    const {
      type,
      isLoggedIn,
      userLoggedIn,
      userInfo,
    } = action;
  
    switch (type) {
      case "isLoggedIn":
        return { ...state, isLoggedIn };
      case "userLoggedIn":
        return { ...state, userLoggedIn };
      case "userInfo":
        return { ...state, userInfo };
      default:
        return state;
    }
  };
  
  export const Context: any = React.createContext(null);
  
