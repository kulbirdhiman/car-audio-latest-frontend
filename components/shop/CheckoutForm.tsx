import React from 'react';

const CheckoutForm = () => {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      
      <form className="space-y-4">
        {/* Name Fields */}
        <div className="flex space-x-4">
          <input type="text" placeholder="First Name" className="border p-2 w-1/2 rounded" />
          <input type="text" placeholder="Last Name" className="border p-2 w-1/2 rounded" />
        </div>

        {/* Address Fields */}
        <input type="text" placeholder="Street Address" className="border p-2 w-full rounded" />
        
        <div className="flex space-x-4">
          <input type="text" placeholder="Landmark (Optional)" className="border p-2 w-1/2 rounded" />
          <input type="text" placeholder="Country" className="border p-2 w-1/2 rounded" />
        </div>

        <div className="flex space-x-4">
          <input type="text" placeholder="City" className="border p-2 w-1/2 rounded" />
          <input type="text" placeholder="State" className="border p-2 w-1/2 rounded" />
        </div> 

        <div className="flex space-x-4">
          <input type="text" placeholder="Pin Code" className="border p-2 w-1/2 rounded" />
          <input type="tel" placeholder="Phone Number" className="border p-2 w-1/2 rounded" />
        </div>

        <input type="email" placeholder="Email" className="border p-2 w-full rounded" />

        {/* Buttons */}
        <div className="flex space-x-3">
          <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Save Address
          </button>
          <button type="button" className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
