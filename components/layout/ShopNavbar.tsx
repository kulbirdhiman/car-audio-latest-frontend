"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { CiUser } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import SearchBar from "./ShopSearchBar";
import ShopMenuHeader from "./ShopMenuHeader";
import MegaMenu from "./MegaMenu";
import CarProductsDropdown from "../globals/DropDown";

interface NavBarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  departments: any[];
}

const ShopNavBar: React.FC<NavBarProps> = ({ open, setOpen, departments }) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { cartCount } = useSelector((state: any) => state.cart);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  console.log(departments, "data ");
  return (
    <div className="w-full ">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center text-xs text-black py-2 px-4 bg-white">
        <h4>Welcome to car audio expert</h4>
        <div className="flex gap-4">
          <Link href="/support" className="text-sm hover:underline">
            Support
          </Link>
          <Link
            href="/business"
            className="text-sm font-semibold hover:underline"
          >
            For Business ↗
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white text-black">
        <nav className="flex items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo & Menu */}
          <div className="flex gap-4 items-center justify-center">
            <Link href="/" className="text-xl font-bold flex items-center">
              <Image
                src="/CAR-AUDIO-EXPERT.png"
                alt="Logo"
                width={120}
                height={75}
                className="w-auto h-[40px] object-cover"
              />
            </Link>

            {/* Menu */}
            <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <ShopMenuHeader data={departments} />
            </ul>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center gap-4">
            {/* Desktop SearchBar */}
            <div className="relative hidden md:block w-[300px]">
              <SearchBar departments={departments} />
            </div>

            {/* Cart */}
            <Link href="/shopping-cart" className="relative">
              <BsCart2 className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-xs text-white h-[16px] w-[16px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link href="/user/orders">
              <CiUser className="h-6 w-6" />
            </Link>

            {/* Hamburger */}
            <button className="md:hidden" onClick={() => setOpen?.(!open)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Search Dropdown */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: filterOpen ? "auto" : 0,
            opacity: filterOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden px-4 pb-2 md:hidden"
        >
          <SearchBar departments={departments} />
        </motion.div>
      </div>
    </div>
  );
};

export default ShopNavBar;
