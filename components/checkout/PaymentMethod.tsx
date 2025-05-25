import { useState } from "react";
import SquarePayment from "./SquarePayment";
import PayPalComponent from "./PayPalComponent";
import { FaCcVisa, FaCcPaypal } from "react-icons/fa";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LOCAL_PICKUP, STANDARD_DELIVERY } from "@/app/constants";
import toast from "react-hot-toast";

const paymentMethods = [
  { id: "credit_card", name: "Credit Card", icon: <FaCcVisa /> },
  // { id: "paypal", name: "PayPal", icon: <FaCcPaypal /> },
];

const PaymentSelector: React.FC<any> = ({
  discount,
  shippingPrice,
  productData,
  setTermAndCondition,
  termAndCondition,
  sameAsBilling,
  selectedMethod,
  setSelectedMethod,
  setShippingErrors,
  shippingErrors,
  shippingAddress,
  setShippingAddress,
  setBillingAddress,
  billingAddress,
  setBillingErrors,
  billingErrors,
  selectedShipping,
}) => {
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const [spiner, setSpiner] = useState(false);
  const handlePayment = async (method:any) => {
    if (!termAndCondition) {
      toast.error("Please accept our term and conditions");
      return;
    }

    if (
      selectedShipping !== STANDARD_DELIVERY &&
      selectedShipping !== LOCAL_PICKUP
    ) {
      toast.error("Please select a delivery option");
      return;
    }

    setSelectedMethod(method.id);
  };

  return (
    <div className="flex flex-col gap-6 mt-6 p-2 bg-white shadow-lg rounded-xl max-w-lg mx-auto border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-700">
        Select Payment Method
      </h2>

      {/* Payment Method Selection */}
      <div className="w-full p-4 bg-gray-100 rounded-lg">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className="flex items-center gap-3 p-3 cursor-pointer bg-white rounded-lg shadow-sm border border-gray-300 mb-2 hover:border-blue-600 transition"
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handlePayment(method)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                selectedMethod === method.id
                  ? "border-blue-600"
                  : "border-gray-400"
              }`}
            >
              {selectedMethod === method.id && (
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              )}
            </span>
            <span className="flex items-center gap-2 text-gray-700 font-medium">
              {method.icon} {method.name}
            </span>
          </label>
        ))}
      </div>

      {/* Payment Form - Render Based on Selected Method */}
      {selectedMethod && (
        <div className="w-full max-w-md p-3 shadow-md rounded-lg border border-gray-300 bg-gray-50">
          {selectedMethod === "credit_card" && (
            <SquarePayment
            selectedShipping={selectedShipping}
            discount={discount}
              spiner={spiner}
              setSpiner={setSpiner}
              productData={productData.result}
              billingAddress={billingAddress}
              shippingAddress={sameAsBilling ? billingAddress : shippingAddress}
            />
          )}
          {selectedMethod === "paypal" && <PayPalComponent />}
        </div>
      )}
    </div>
  );
};

export default PaymentSelector;
