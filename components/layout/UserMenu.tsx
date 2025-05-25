"use client";
import React from "react";
import {
  MdDashboard,
  MdAddShoppingCart,
} from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/actions/auth";
import { AppDispatch } from "@/store/store";

const UserMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const items = [
    { name: "Dashboard", icon: MdDashboard, url: "/user/dashboard" },
    { name: "Orders", icon: MdAddShoppingCart, url: "/user/orders" },
    { name: "Address", icon: CiLocationOn, url: "/user/addresses" },
    { name: "Account", icon: IoPersonOutline, url: "/user/profile" },
  ];

  const logoutHandler = async () => {
    const response = await dispatch(logoutUser());
    const res = response.payload;
    if ((res as any)?.status) {
      router.push("/");
    }
  };

  return (
    <div
      className="w-64 h-screen  text-black p-4 flex flex-col justify-between"
    >
      {/* Top Menu Items */}
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const isActive = pathname.startsWith(item.url);
          return (
            <Link href={item.url} key={index}>
              <div
                className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer
                  ${isActive ? "bg-blue-600 text-gray-100" : "hover:bg-blue-500/10 text-black hover:text-white"}`}
              >
                <item.icon className="text-xl flex-shrink-0" />
                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Tall Button */}
      <div className="flex flex-col gap-3 items-center">
        <div
          onClick={logoutHandler}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 
          cursor-pointer transition-all duration-300"
        >
          <LuLogOut className="text-xl flex-shrink-0" />
          <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
