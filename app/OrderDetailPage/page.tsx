import React from 'react'
import OrderDetailPage from '@/components/order/OrderDetailPage'
const page = () => {
    const order = {
        id: "ORD12345",
        date: "2025-03-04T12:30:00Z",
        status: "Delivered",
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+123456789",
          address: "123 Main Street, New York, NY 10001"
        },
        items: [
          {
            name: "Product 1",
            image: "/images/product1.jpg",
            price: 49.99,
            quantity: 2
          },
          {
            name: "Product 2",
            image: "/images/product2.jpg",
            price: 29.99,
            quantity: 1
          }
        ],
        subtotal: 129.97,
        discount: 10.00,
        total: 119.97
      };
      
  return (
    <div>
        <OrderDetailPage order={order} />
    </div>
  )
}

export default page