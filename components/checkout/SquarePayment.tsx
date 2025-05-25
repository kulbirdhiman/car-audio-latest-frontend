"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PAYMENT_METHODS } from "@/app/constants";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const SquarePayment: React.FC<any> = ({
  discount,
  spiner,
  setSpiner,
  shippingAddress,
  billingAddress,
  productData,
  selectedShipping,
}) => {
  const { loading, user } = useSelector((state: RootState) => state.auth);


  const dispatch = useDispatch<AppDispatch>();

  const [loader,setLoader] = useState(false)
  const [payment, setPayment] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const loadSquare = async () => {
      try {
        const Square = await import("@square/web-sdk");

        const payments = await Square.payments(
          (process.env as any).NEXT_PUBLIC_SQUARE_APP_ID,
          "sandbox"
        );

        if (!payments) {
          console.error("Failed to initialize Square Payments");
          return;
        }

        const card = await payments.card();
        await card.attach("#card-container");

        setPayment({ payments, card });
      } catch (error) {
        console.error("Square SDK Error:", error);
      }
    };

    loadSquare();
  }, []);

  const handlePayment = async () => {

    if (!payment) return;
setLoader(true)
    const { card, payments } = payment;
    const tokenResult = await card.tokenize();

    if (tokenResult.status === "OK") {
      try {
        console.log("Card nonce:", tokenResult.token);

        // Step 1: Create Payment
        const { data: paymentResponse } = await axios.post(
          `${process.env.NEXT_PUBLIC_ADDRESS}/v1/square/create-order`,
          {
            selectedShipping: selectedShipping,
            user: user,
            sourceId: tokenResult.token,
            amount: 10,
            shippingAddress,
            billingAddress,
            productData,
            discount,
            paymentMethod: PAYMENT_METHODS.square_card,
          }
        );

        if (paymentResponse.success) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_ADDRESS}/v1/square/capture-payment`,
            {
              user: user,
              paymentId: paymentResponse.paymentId,
              order: paymentResponse.order,
            }
          );
          setLoader(false)
          localStorage.setItem("addToCart", "[]");

          dispatch(loadCart(0));
          router.push(`/payment-successfull/${paymentResponse.order.id}`);
          localStorage.setItem("addToCart", "[]");
          toast.success("Order Placed Successfully!");
        }
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Payment failed");
      }
    } else {
      setLoader(false)
      toast.error("Payment tokenization failed");
    }
  };

  return (
    <div>
      <div id="card-container"></div>
      <button
      disabled={loader}
        className="bg-amazon_blue text-white border-2 rounded w-full p-2"
        onClick={handlePayment}
      >
    {loader ? "loading..." : "Pay Now"} 
      </button>
    </div>
  );
};

export default SquarePayment;
