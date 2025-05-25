"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";

const PayPalComponent = () => {
  const [orderID, setOrderID] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create order
  const createOrder = async () => {
    try {
      // address: selectedAdddress,
      // amount: amount,
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/create-order`
      );
      setOrderID(data.orderID);
      return data.orderID;
    } catch (err) {
      setError("Failed to create order.");
      console.error(err);
    }
  };

  // Capture payment
  const onApprove = async (data: any) => {
    try {
      const { data: responseData } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/paypal/capture-order`,
        {
          orderID: data.orderID,
        }
      );

      if (responseData.status === "COMPLETED") {
        setPaid(true);
      }
    } catch (err) {
      setError("Payment failed.");
      console.error(err);
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
