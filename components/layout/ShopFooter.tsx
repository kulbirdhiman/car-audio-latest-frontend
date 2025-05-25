"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { SiAfterpay } from "react-icons/si";
import { FaPaypal } from "react-icons/fa";
import Image from "next/image";

interface LinkItem {
  name: string;
  link: string;
}

const ShopFooter: React.FC = () => {
  const companyLinks: LinkItem[] = [
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
    { name: "Customer Services", link: "/customer-services" },
  ];

  const policyLinks: LinkItem[] = [
    { name: "Terms & Conditions", link: "/term-condtion" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    // { name: "Return Policy", link: "/return-policy" },
    { name: "secure-shopping", link: "/secure-shopping" },
    { name: "Cancellation & Refunds", link: "/cancellation-refunds" },
    { name: "shipping-and-return", link: "/shipping-and-return" },
    // { name: "Request a Product", link: "/request-a-product" },
  ];

  return (
    <footer className="bg-[#111] text-gray-300 pt-10 pb-5 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10">

        {/* Brand + About */}
        <div>
          <Link href="/">
            <Image
              src="/CAR-AUDIO-EXPERT.png"
              alt="Kayhan Audio"
              width={150}
              height={60}
              className="mb-4"
            />
          </Link>
          <p className="text-sm">
            Car audio expert is one of the fastest-growing manufacturers of car entertainment products. Founded in Germany in 1997.
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <Link href="https://www.facebook.com/KayhanAudio/" target="_blank">
              <FaFacebook className="hover:text-white text-blue-500" />
            </Link>
            <Link href="https://x.com/AudioKayhan" target="_blank">
              <FaTwitter className="hover:text-white text-blue-400" />
            </Link>
            <Link href="https://www.instagram.com/kayhanaudio/" target="_blank">
              <FaInstagram className="hover:text-white text-pink-500" />
            </Link>
            <Link href="https://www.youtube.com/@KAYHANAUDIO" target="_blank">
              <FaYoutube className="hover:text-white text-red-600" />
            </Link>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.link} className="hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policy Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm">
            {policyLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.link} className="hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <p className="text-sm mb-4">Get exclusive offers & updates straight to your inbox.</p>
          <div className="flex flex-col  flex-wrap items-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full   px-3 py-2 rounded-md text-white border border-white"
            />
            <button className="bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center border-t border-gray-700 mt-10 pt-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Car Audio expert. All rights reserved.
      </div>
    </footer>
  );
};

export default ShopFooter;
