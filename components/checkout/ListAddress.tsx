import { getAddress } from "@/store/actions/user/address";
import { AppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BillingForm from "./BillingAddress";
import AddAddressForm from "../user/AddAddress";
import Loader from "../globals/Loader";
import { FaRegSadTear } from "react-icons/fa";

const ListAddress: React.FC<any> = ({
  setSelectedShipping,
  setShippingPrice,
  selectedAddress,
  setSelectedAddress,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState({});
  const [billingErrors, setBillingErrors] = useState({});
  const [addresses, setAddresses] = useState<any[]>([]);
  const [apiHit, setApiHit] = useState(false);

  const getMyAddress = async () => {
    try {
      const res = await dispatch(getAddress({})).unwrap();

      if (res.success) {
        setAddresses(res.data.result);
        setApiHit(true);
        if (res.data.result.length > 0) {
          setSelectedAddress(res.data.result[0]);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMyAddress();
  }, []);

  return (
    <>
      {addresses.length > 0 && (
        <>
          <h1 className="text-xl my-4 font-semibold">Select Billing Address</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 text-blue-500 text-sm"
          >
            + Add Address
          </button>
        </>
      )}
      <AddAddressForm
        getMyAddress={getMyAddress}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setBillingErrors={setBillingErrors}
        billingErrors={billingErrors}
        setBillingAddress={setBillingAddress}
        billingAddress={billingAddress}
      />
      {apiHit && addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div
            key={address.id}
            className="p-2 rounded shadow-sm bg-gray-50 text-xs mt-2s"
          >
            <div className="bg-gray-50 p-2">
              <div className="flex items-center justify-between border-b-2 border-gray-300 p-4">
                <div
                  onClick={() => {
                    setShippingPrice(0);
                    setSelectedShipping();
                    setSelectedAddress(address);
                  }}
                  className="flex items-center gap-1 hover:cursor-pointer"
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress.id === address.id}
                    // onChange={() => setSelectedAddress(address)}
                    className="accent-blue-600 mx-3"
                  />
                  <h2 className="font-light text-lg">
                    <span className="font-bold mr-2">
                      {address.name} {address.last_name}
                    </span>
                    {address.street_address}, {address.city},{" "}
                    {address.state.name} - {address.postcode}
                    <br />
                    Phone: {address.phone}
                  </h2>
                </div>
                <div className="flex gap-1 font-bold text-xl">
                  <button
                    className="text-gray-600 text-sm border-r-2 border-gray-500  px-2"
                    onClick={() => {
                      setBillingAddress(address);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-gray-600 text-sm"
                    //   onClick={() => handleDeleteAddress(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {!apiHit ? (
            <Loader />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <FaRegSadTear className="text-gray-400 text-6xl mb-4" />
                <p className="text-gray-600 text-lg font-semibold">
                  No addresses found
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Add a new address to proceed with checkout.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  + Add Address
                </button>
              </div>{" "}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ListAddress;
