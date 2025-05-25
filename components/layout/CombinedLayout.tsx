"use client";

import React, { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { myProfile } from "@/store/actions/auth";
import ShopLayout from "./ShopLayout";
import AdminLayout from "./AdminLayout";
 

// Define Props Type
interface CombinedLayoutProps {
  children: ReactNode;
}

// Function to dynamically select the layout based on pathname
const getLayout = (pathname: string, children: ReactNode) => {
  const layouts: Record<string, React.FC<{ children: ReactNode }>> = {
    admin: AdminLayout,
    shop: ShopLayout,
   
  };

  const firstSegment = pathname.split("/")[1];
  const LayoutComponent = layouts[firstSegment] || ShopLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

const CombinedLayout: React.FC<CombinedLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(myProfile());
  
    
  }, [dispatch]);

  return <>{getLayout(pathname, children)}</>;
};

export default CombinedLayout;
