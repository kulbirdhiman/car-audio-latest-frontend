"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux"; 
import { RootState } from "@/store/store"; // Import RootState type from store
import { USER_ROLE } from "@/app/constants";
// Define Props Type
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();

  // Correctly type Redux state
  const { loading, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
  

    if (!loading && (!user || user?.role !== USER_ROLE.admin)) {
      console.log("user", user);
      console.log("loading",loading);
      
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  return (
    <div className="dark:bg-white">
      <AdminSidebar />
      <div className="py-8 p-2 sm:ml-64 ">
        {/* <div className="md:border-2 md:p-9 dark:text-black  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"> */}
          {children}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminLayout;
