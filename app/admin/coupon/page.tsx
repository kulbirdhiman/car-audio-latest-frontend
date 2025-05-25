"use client";
import React, { useState } from 'react';
import AddCouponModal from '@/components/admin/AddCouponModal';

interface Coupon {
    code: string;
    discountAbove500: number;
    discountBelow500: number;
    excludeDiscountedProducts: boolean;
    isActive: boolean;
    category: string;
    model: string;                // Added "model" field
    specificProduct: string;
    validFrom: string;
    validTo: string;
    validFromTime?: string;        // Optional if you want to handle time later
    validToTime?: string;          // Optional if you want to handle time later
}

const AdminCoupons = () => {
    const initialCoupons: Coupon[] = [
        {
            code: 'SAVE10',
            discountAbove500: 10,
            discountBelow500: 5,
            excludeDiscountedProducts: true,
            isActive: true,
            category: 'Electronics',
            model: 'Laptop',                  // Example model
            specificProduct: '',
            validFrom: '2025-03-01',
            validTo: '2025-03-15',
        },
        {
            code: 'WELCOME5',
            discountAbove500: 8,
            discountBelow500: 5,
            excludeDiscountedProducts: false,
            isActive: true,
            category: 'Fashion',
            model: 'Sneakers',                // Example model
            specificProduct: 'T-Shirt',
            validFrom: '2025-03-01',
            validTo: '2025-03-10',
        },
    ];

    const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addCoupon = (coupon: Coupon) => {
        setCoupons([...coupons, coupon]);
    };

    const toggleCouponStatus = (code: string) => {
        setCoupons(coupons.map(coupon =>
            coupon.code === code ? { ...coupon, isActive: !coupon.isActive } : coupon
        ));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Coupon Management</h1>

            <button
                onClick={() => setIsModalOpen(true)}
                className="underline text-blue-700 float-end decoration-blue-700 px-4 py-2 rounded mb-4"
            >
                Add Coupon
            </button>

            {/* Coupon List */}
            <div className="mt-2 bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                <h2 className="font-semibold mb-3">Existing Coupons</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Code</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Model</th>          {/* New column for Model */}
                            <th className="p-2 border">Specific Product</th>
                            <th className="p-2 border">Valid From</th>
                            <th className="p-2 border">Valid To</th>
                            <th className="p-2 border">≥ $500 Discount</th>
                            <th className="p-2 border">&lt; $500 Discount</th>
                            <th className="p-2 border">Exclude Discounted?</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(coupon => (
                            <tr key={coupon.code} className="border-b">
                                <td className="p-2 border">{coupon.code}</td>
                                <td className="p-2 border">{coupon.category || '-'}</td>
                                <td className="p-2 border">{coupon.model || '-'}</td>    {/* Displaying Model */}
                                <td className="p-2 border">{coupon.specificProduct || '-'}</td>
                                <td className="p-2 border">{coupon.validFrom}</td>
                                <td className="p-2 border">{coupon.validTo}</td>
                                <td className="p-2 border">{coupon.discountAbove500}%</td>
                                <td className="p-2 border">{coupon.discountBelow500}%</td>
                                <td className="p-2 border">{coupon.excludeDiscountedProducts ? 'Yes' : 'No'}</td>
                                <td className="p-2 border">{coupon.isActive ? 'Active' : 'Inactive'}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => toggleCouponStatus(coupon.code)}
                                        className={`px-3 py-1 rounded ${
                                            coupon.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                        }`}
                                    >
                                        {coupon.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add Coupon */}
            {isModalOpen && (
                <AddCouponModal
                    onClose={() => setIsModalOpen(false)}
                    // onAddCoupon={addCoupon}
                />
            )}
        </div>
    );
};

export default AdminCoupons;
