import React, {createContext, useState, useContext} from "react";
export const LoadingContext = createContext();
export const useLoading = () => {
    return useContext(LoadingContext);
  };
export const LoadingProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false); 
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  return(
    <LoadingContext.Provider value = {{isLoading, startLoading, stopLoading}}>
          {children}
    </LoadingContext.Provider>
)
}
