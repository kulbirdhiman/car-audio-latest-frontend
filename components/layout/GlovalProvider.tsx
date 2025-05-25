"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CombinedLayout from "./CombinedLayout";
 
// Define Props Type
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
    
        <CombinedLayout>{children}</CombinedLayout>
      </Provider>
    </div>
  );
};

export default GlobalProvider;
