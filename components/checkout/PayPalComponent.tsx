"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

interface PayPalProps {
  discount: number;
  spiner: boolean;
  setSpiner: (val: boolean) => void;
  shippingAddress: any;
  billingAddress: any;
  productData: any[];
  selectedShipping: any;
  user: any;
}

const PayPalComponent: React.FC<PayPalProps> = ({
  discount,
  spiner,
  setSpiner,
  shippingAddress,
  billingAddress,
  productData,
  selectedShipping,
  // user,
}) => {
  const [orderID, setOrderID] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loading, user } = useSelector((state: RootState) => state.auth);

  // ✅ Create PayPal Order
  const createOrder = async () => {
    try {
      setSpiner(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/create-order`,
        {
          selectedShipping,
          user,
          shippingAddress,
          billingAddress,
          productData,
          discount,
          paymentMethod: "paypal", // clearly specify it's PayPal
        }
      );
      setOrderID(data.orderID);
      return data.orderID;
    } catch (err) {
      setError("Failed to create order.");
      console.error(err);
    } finally {
      setSpiner(false);
    }
  };

  // ✅ Capture Payment
  const onApprove = async (data: any) => {
    try {
      setSpiner(true);
      const { data: responseData } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/capture-order`,
        {
          orderID: data.orderID,
          order: orderID,
          user,
        }
      );

      if (responseData.status === "COMPLETED") {
        setPaid(true);
      } else {
        setError("Payment was not completed.");
      }
    } catch (err) {
      setError("Payment failed.");
      console.error(err);
    } finally {
      setSpiner(false);
    }
  };

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
    >
      <div className="flex flex-col items-center">
        {paid ? (
          <h2 className="text-green-600 text-lg font-semibold">
            Payment Successful! 🎉
          </h2>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Pay with PayPal</h2>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;
