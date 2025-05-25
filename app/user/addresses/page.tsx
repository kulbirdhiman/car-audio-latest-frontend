"use client";
import React, { useEffect, useState } from "react";
import BillingFormModal from "@/components/user/AddAddress";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteAddress, getAddress } from "@/store/actions/user/address";
import Loader from "@/components/globals/Loader";
import DeleteModal from "@/components/globals/DeleteModel";

const Address = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState({});
  const [billingErrors, setBillingErrors] = useState({});
  const [data, setData] = useState<any>([]);
  const [apiHit, setApiHit] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const dispatch = useDispatch<AppDispatch>();

  const getMyAddress = async () => {
    try {
      const res = await dispatch(getAddress({})).unwrap();
      if (res.success) {
        setData(res.data.result);
        setApiHit(true);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getMyAddress();
  }, []);

  const deletAddressF = async () => {
    await dispatch(deleteAddress(billingAddress as any));
    setIsDeleteOpen(false);
    setBillingAddress({})
    getMyAddress();

  }

  return (
    <div className="p-6">
      <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        deleteRecord={deletAddressF}
      />
      <h2 className="text-2xl text-black font-semibold mb-4">Your Addresses</h2>

      {/* Add Address Button (Styled like Amazon) */}
      {apiHit ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div
              className="p-6 border border-dashed rounded-lg shadow-md flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
              onClick={() => setIsOpen(true)}
            >
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-500">+</div>
                <p className="text-gray-500">Add address</p>
              </div>
            </div>

            {/* Address Cards */}
            {data.map((item: any, index: number) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                {/* Default Address Badge */}
                {item.is_default && (
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Default:{" "}
                    <span className="bg-gray-200 px-2 py-1 rounded">
                      Amazon
                    </span>
                  </div>
                )}

                {/* Address Details */}
                <h3 className="text-lg font-semibold">{item.full_name}</h3>
                <p className="text-gray-600">{item.street_address}</p>
                <p className="text-gray-600">
                  {item.city}, {item.state.name}, {item.country.name}{" "}
                  {item.postcode}
                </p>
                <p className="text-gray-600">Phone: {item.phone}</p>

                {/* Action Buttons */}
                <div className="mt-3 flex space-x-4 text-blue-600 text-sm">
                  <button
                    onClick={() => {
                      setBillingAddress(item);
                      setIsOpen(true);
                    }}
                    className="hover:underline"
                  >
                    Edit
                  </button>
                  <button onClick={() => { setIsDeleteOpen(true); setBillingAddress(item); }} className="hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}

      {/* Add Address Modal */}
      <BillingFormModal
        getMyAddress={getMyAddress}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setBillingErrors={setBillingErrors}
        billingErrors={billingErrors}
        setBillingAddress={setBillingAddress}
        billingAddress={billingAddress}
      />
    </div>
  );
};

export default Address;
