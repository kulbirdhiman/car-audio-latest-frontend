"use client";

import React, { useState } from "react";

import {
  Home,
  LayoutDashboard,
  Users,
  Table,
  Tags,
  Boxes,
  ShoppingCart,
  Percent,
  Puzzle,
  Settings,
  LogOut,
} from "lucide-react";

import { Bars4Icon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/actions/auth";
import { ChevronDownIcon } from "lucide-react";
import { MdLocalOffer } from "react-icons/md";

const sidebarItems = [
  // { href: "/", icon: Home, label: "Home" },
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/departments", icon: Table, label: "Departments" },
  { href: "/admin/categories", icon: Tags, label: "Categories" },
  { href: "/admin/products", icon: Boxes, label: "Products" },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    label: "Discount",
    icon: Percent,
    subItems: [
      { href: "/admin/discount/coupons", label: "Coupons" },
      { href: "/admin/discount/gift-card", label: "Gift Card" },
    ],
  },
  {
    label: "Extras",
    icon: Puzzle,
    subItems: [
      { href: "/admin/extras/add-on", label: "Add On" },
      { href: "/admin/extras/variation", label: "Variations" },
    ],
  },
  // { href: "/admin/settings", icon: Settings, label: "Settings" },
];


export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = async () => {
    const response = await dispatch(logoutUser());
    const res = response.payload as { status: boolean; message: string };
    if (res?.status) {
      router.push("/");
    }
  };

  return (
    <>
      {/* <nav className="  w-full bg-black border-b p-2 border-gray-200 dark:bg-black dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link href="/" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  Car audio expert
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <button type="button" className="flex text-sm text-white">
                <span className="sr-only">Open user menu</span>
                Hello, Admin
              </button>
            </div>
          </div>
        </div>
      </nav> */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="float-end flex md:hidden  items-center gap-2 bg-white text-black px-4 py-2  hover:bg-gray-100 transition-all"
      >
        <Bars4Icon className="w-5 h-5 text-black" />
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-56 h-screen py-7 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } dark:bg-white dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
              >
                <Home className="w-6 h-6" />
                <span className="ml-3">home</span>
              </Link>
            </li>
            {sidebarItems.map(({ href, icon: Icon, label, subItems }) => (
              <li key={label}>
                {subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(label)}
                      className="flex items-center justify-between w-full p-2 text-black rounded-lg hover:bg-black hover:text-white"
                    >
                      <div className="flex items-center">
                        <Icon className="w-6 h-6" />
                        <span className="ml-3">{label}</span>
                      </div>
                      <ChevronDownIcon
                        className={`w-5 h-5 transform ${
                          openDropdown === label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === label && (
                      <ul className="pl-8 space-y-2">
                        {subItems.map(({ href, label }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              className="flex items-center p-2 text-black rounded-lg hover:bg-black hover:text-white"
                            >
                              <span>{label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={href!}
                    className={`flex items-center p-2 ${
                      pathname.includes(href!)
                        ? "bg-black text-white"
                        : "text-black"
                    } rounded-lg hover:bg-black hover:text-white`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="ml-3">{label}</span>
                  </Link>
                )}
              </li>
            ))}

            {/* Logout */}
            <li>
              <button
                onClick={logoutHandler}
                className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
              >
                <LogOut className="w-6 h-6" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
