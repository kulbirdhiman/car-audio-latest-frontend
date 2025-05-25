"use client";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import CheckoutForm from "@/components/shop/CheckoutForm";
import { FaShippingFast, FaTruck } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { FaGift } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ListAddress from "@/components/checkout/ListAddress";
import {
  calculatePrice,
  calculateRegularPrice,
  calculateSubTotal,
  localCartData,
  myCart,
} from "@/store/actions/cart";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import BillingForm from "@/components/checkout/BillingAddress";
import PaymentSelector from "@/components/checkout/PaymentMethod";
import ShippingOptions from "@/components/checkout/ShippingOptions";
import { COUPEN_TYPE, LOCAL_PICKUP, STANDARD_DELIVERY } from "../constants";
import { useDispatch } from "react-redux";
import Link from "next/link";
import AddCoupon from "@/components/checkout/AddCoupon";
import { applyCoupon } from "@/store/actions/checkOut";
import toast from "react-hot-toast";
interface Address {
  id: number;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
  email: string;
}

const CheckOut: React.FC = () => {
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [apiHit, setApihit] = useState(false);
  const [data, setData] = useState<any>({ result: [] });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      pin: "10001",
      phone: "1234567890",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      street: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      pin: "90001",
      phone: "9876543210",
      email: "janesmith@example.com",
    },
  ]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState<any>({});
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [billingErrors, setBillingErrors] = useState({});
  const [shippingErrors, setShippingErrors] = useState({});
  const [selectedShipping, setSelectedShipping] = useState<any>();
  const [termAndCondition, setTermAndCondition] = useState(false);
  const [shippingPrice, setShippingPrice] = useState<any>(0);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setdiscount] = useState({
    // applied: 0,
    // coupon_code: 0,
    // gift_card: 0,
    // is_shipping_free: 0,
  });
  const [couponApplied, setCouponApplied] = useState(false);

  const getMyCarts = async () => {
    try {
      if (user && !loading) {
        const apiResponse = await dispatch(myCart({}));
        const res = apiResponse.payload;
        setData(res);
      } else {
        const cartData = localCartData();
        setData(cartData);
      }

      setApihit(true);
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  useEffect(() => {
    getMyCarts();
  }, [user, loading]);

  const calculateShipping = (data:any) => {
    if ((billingAddress as any).postcode || (shippingAddress as any).postcode) {
      setShippingPrice(99);
    } else {
      setShippingPrice(0);
    }

    // return 99;
  };

  const applyCouponF = async () => {
    try {
      setSelectedMethod("");

      const res = await dispatch(
        applyCoupon({
          products: data.result,
          code: couponCode,
        })
      );
      const apiRes = res.payload;

      if ((apiRes as any).success) {
        // if ((apiRes as any).data.result.coupon_type == COUPEN_TYPE.discount) {
        //   setCouponApplied(true);
        //   setdiscount({
        //     ...discount,
        //     coupon_code: (apiRes as any).data.result.discount,
        //     applied: 1,
        //   });
        //   getMyCarts();
        // }

        // if (
        //   (apiRes as any).data.result.coupon_type == COUPEN_TYPE.free_shiipping
        // ) {
        //   setCouponApplied(true);
        //   setdiscount({
        //     ...discount,
        //     is_shipping_free: 1,
        //     applied: 1,
        //   });
        //   getMyCarts();
        // }
        if ((apiRes as any).data.result.coupon_type == COUPEN_TYPE.product) {
          setdiscount((apiRes as any).data.result);
          setCouponApplied(true);
          const r = (apiRes as any).data.result.product;
          const p = {
            cart_id: Date.now(),
            images: r.images,
            quantity: 1,
            name: r.name,
            slug: r.slug,
            weight: r.weight,
            regular_price: r.regular_price,
            discount_price: r.discount_price,
            variations: [],
            product_id: r.id,
            price: r.discount_price ? r.discount_price : r.regular_price,
            department_id: r.department_id,
            category_id: r.category_id,
            model_id: r.model_id,
            is_free: 1,
          };
          console.log("p====", p);
          const op = { ...data, result: [...data.result, p] };
          console.log("op", op);

          setData((prev:any) => ({
            ...prev,
            result: [...prev.result, p],
          }));
        } else {
          setdiscount((apiRes as any).data.result);
          getMyCarts();
        }
      }
      setCouponOpen(false);
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  useEffect(() => {
    console.log(data);
    setSelectedShipping({});
    setSelectedMethod("");
    setCouponCode("");
    setdiscount({
      // applied: 0,
      // coupon_code: 0,
      // gift_card: 0,
      // is_shipping_free: 0,
    });
    getMyCarts();
  }, [sameAsBilling, billingAddress, shippingAddress, selectedAddress]);

  return (
    <>
      <AddCoupon
        applyCouponF={applyCouponF}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        isOpen={couponOpen}
        setIsOpen={setCouponOpen}
      />

      <div className="w-[90%]  mx-auto">
        <h1 className="text-3xl p-6 font-bold fon text-black">CheckOut</h1>
        <button
          onClick={() => {
            if (
              selectedShipping == STANDARD_DELIVERY ||
              selectedShipping == LOCAL_PICKUP
            ) {
              setCouponOpen(!couponOpen);
            } else {
              toast.error("Please select your shipping way first");
              return;
            }
          }}
          className="bg-black relative p-5 w-full text-white rounded-md my-2 flex"
        >
          {" "}
          <CiDiscount1 className="text-lg mx-2" />
          Have a Coupan ? click here to enter your code
          {(discount as any)?.coupon_applied == 1 && (
            <div className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded-md right-3 top-2">
              Applied
            </div>
          )}
        </button>
        {/* <button className="bg-amazon_blue p-5 w-full text-white rounded-md my-2 flex">
          <FaGift className="text-lg mx-2" /> Have a gift Card? click here to
          enter your code
        </button> */}
      </div>
      <section className="  gap-10 w-full md:w-[90%]  grid grid-cols-3 justify-around mx-auto mt-3  text-black">
        {/* Shipping Address Section */}
        <div className=" py-4 md:col-span-2 col-span-3 pb-4 rou border-none">
          {user ? (
            <>
              <ListAddress
                setShippingPrice={setShippingPrice}
                setSelectedShipping={setSelectedShipping}
                setSelectedAddress={setSelectedAddress}
                selectedAddress={selectedAddress}
              />
            </>
          ) : (
            <BillingForm
              setBillingErrors={setBillingErrors}
              billingErrors={billingErrors}
              setBillingAddress={setBillingAddress}
              billingAddress={billingAddress}
            />
          )}
          {selectedShipping != LOCAL_PICKUP && (
            <ShippingAddress
              setShippingPrice={setShippingPrice}
              setSelectedShipping={setSelectedShipping}
              setSelectedMethod={setSelectedMethod}
              shippingErrors={shippingErrors}
              sameAsBilling={sameAsBilling}
              setSameAsBilling={setSameAsBilling}
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
            />
          )}
        </div>

        <div className="w-full md:col-span-1 col-span-3   my-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
          <h1 className=" text-2xl font-semibold border-b pb-3">
            Order Summary
          </h1>

          {/* Product Details */}
          <div className="py-4 border-b text-sm">
            <div className="flex justify-between items-start">
              <div className="w-[70%]">
                <h2 className="text-lg font-semibold">Product</h2>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Total</h2>
              </div>
            </div>
            <div className="flex flex-col w-full justify-between gap-8 items-start">
              {data.result.map((row:any, i:any) => {
                const discountPercentage =
                  row.discount_price > 0
                    ? Math.round(
                        ((row.regular_price - row.discount_price) /
                          row.regular_price) *
                          100
                      )
                    : 0;

                return (
                  <div
                    key={i}
                    className="flex justify-between w-full items-center p-4 gap-6 bg-white border-b border-gray-200"
                  >
                    <div className="flex flex-col">
                      <p className="text-gray-700 font-semibold">{row.name}</p>

                      {(row as any).variations.length > 0 && (
                        <div className="mt-2 space-y-1 bg-gray-50 px-2 ">
                          {(row as any).variations.map((variation:any, index:any) => (
                            <div key={index} className="flex gap-2">
                              <strong className="text-gray-800">
                                {variation.name}:
                              </strong>
                              <span className="text-gray-600">
                                {variation.options
                                  .map((op:any) => op.name)
                                  .join(", ")}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {row.is_free != 1 ? (
                      <div className="flex items-center gap-2">
                        {row.discount_price > 0 ? (
                          <>
                            <div className="flex flex-col items-end">
                              <p className="text-red-500 font-bold">
                                ${calculatePrice(row)}
                              </p>
                              <p className="text-sm text-gray-500 line-through">
                                ${calculateRegularPrice(row)}
                              </p>
                            </div>

                            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                              {discountPercentage}% OFF
                            </span>
                          </>
                        ) : (
                          <p className="font-medium">${calculatePrice(row)}</p>
                        )}
                      </div>
                    ) : (
                      <div className="text-green-600 font-semibold">Free</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total */}

          {/* Shipping */}
          <ShippingOptions
            productData={data.result}
            setShippingPrice={setShippingPrice}
            setSelectedShipping={setSelectedShipping}
            selectedShipping={selectedShipping}
            sameAsBilling={sameAsBilling}
            shippingErrors={shippingErrors}
            setShippingErrors={setShippingErrors}
            setBillingErrors={setBillingErrors}
            billingErrors={billingErrors}
            setBillingAddress={setBillingAddress}
            billingAddress={billingAddress}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            selectedAddress={selectedAddress}
          />
          {/* Terms & Conditions */}
          <p className="text-sm text-gray-600">
            By placing an order, you agree to our{" "}
            <Link
              href="/term-condtion"
              className="text-blue-500 hover:underline"
            >
              terms & conditions
            </Link>
            .
          </p>
          <div className="flex items-center my-2 text-xs">
            <input
              checked={termAndCondition}
              onChange={() => {
                setTermAndCondition(!termAndCondition);
                setSelectedMethod("");
              }}
              type="checkbox"
              id="terms"
              className="mr-2 accent-black"
            />
            <label htmlFor="terms">
              I have read and agree to the website{" "}
              <Link
                href="/term-condtion"
                className="text-blue-500 hover:underline"
              >
                terms & conditions
              </Link>
            </label>
          </div>
          <div className="my-3 flex justify-between text-lg font-bold">
            <h2>Subtotal</h2>
            <h2>${calculateSubTotal(data.result)}</h2>
          </div>
          {shippingPrice > 0 && (
            <div className="my-3 flex justify-between text-lg font-bold">
              <h2>Shipping</h2>
              <h2>
                {" "}
                {(discount as any).is_shipping_free != 1
                  ? "$" + shippingPrice
                  : "free"}
              </h2>
            </div>
          )}
          {(discount as any).coupon_code > 0 && (
            <div className="my-3 flex justify-between text-lg font-bold">
              <h2>Coupen Discount</h2>
              <h2>{(discount as any).coupon_code}</h2>
            </div>
          )}
          <div className="my-3 flex justify-between text-lg font-bold">
            <h2>Total</h2>
            <h2>
              $
              {parseFloat(calculateSubTotal(data.result)) +
                ((discount as any).is_shipping_free == 1
                  ? 0
                  : parseFloat(shippingPrice)) -
                ((discount as any).coupon_code
                  ? parseFloat((discount as any).coupon_code)
                  : 0)}
            </h2>
          </div>
          <PaymentSelector
            discount={discount}
            productData={data}
            shippingPrice={shippingPrice}
            termAndCondition={termAndCondition}
            setTermAndCondition={setTermAndCondition}
            selectedShipping={selectedShipping}
            sameAsBilling={sameAsBilling}
            shippingErrors={shippingErrors}
            setShippingErrors={setShippingErrors}
            setBillingErrors={setBillingErrors}
            billingErrors={billingErrors}
            setBillingAddress={setBillingAddress}
            billingAddress={user ? selectedAddress : billingAddress}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
        </div>

        {/* Address Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg w-[90%] max-w-md">
              <h2 className="text-xl font-semibold mb-2">
                {editingAddress ? "Update Address" : "Add Address"}
              </h2>
              <CheckoutForm
              // initialAddress={editingAddress}
              // onSave={handleSaveAddress}
              />
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CheckOut;
