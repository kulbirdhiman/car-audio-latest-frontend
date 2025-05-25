// import React from "react";
// import {
//   CheckCircleIcon,
//   ClockIcon,
//   XCircleIcon,
//   TruckIcon,
// } from "@heroicons/react/24/solid";
// import Image from "next/image";
// const OrderDetailPage = ({ order }) => {
//   if (!order) {
//     return (
//       <div className="text-center py-10 text-lg font-semibold">
//         Loading order details...
//       </div>
//     );
//   }

//   const { id, date, status, customer, items, subtotal, discount, total } =
//     order;

//   const statusColors = {
//     Delivered: "bg-green-100 text-green-700",
//     Pending: "bg-yellow-100 text-yellow-700",
//     Cancelled: "bg-red-100 text-red-700",
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl font-serif">
//       <button className="text-white bg-blue-600 p-2 shadow-lg rounded-lg float-right" >Ship order</button>
//       <h1 className="text-3xl font-semibold font-serif mb-6 text-gray-800">
//         Order Details
//       </h1>
//       {/* Order Information */}
//       <div className="bg-white shadow rounded-lg p-4 my-4 mx-3">
//   <div className="flex flex-col md:flex-row gap-6">
    
//     {/* Customer Information */}
//     <div className="flex-1 min-w-[150px]">
//       <h3 className="text-sm font-semibold border-b pb-2 mb-2">Customer Information</h3>
//       <div className="text-xs space-y-1">
//         <p><span className="font-semibold">Name:</span> John</p>
//         <p><span className="font-semibold">Email:</span> john@gmail.com</p>
//         <p><span className="font-semibold">Number:</span> 9595959</p>
//       </div>
//     </div>

//     {/* Billing Address */}
//     <div className="flex-1 min-w-[150px]">
//       <h3 className="text-sm font-semibold border-b pb-2 mb-2">Billing Address</h3>
//       <div className="text-xs text-gray-600 space-y-1">
//         <p>kharar afafda afa</p>
//         <p>mohali afafa</p>
//         <p>punjab afafa</p>
//       </div>
//     </div>

//     {/* Shipping Address */}
//     <div className="flex-1 min-w-[150px]">
//       <h3 className="text-sm font-semibold border-b pb-2 mb-2">Shipping Address</h3>
//       <div className="text-xs text-gray-600 space-y-1">
//         <p>kharar</p>
//         <p>mohali</p>
//         <p>punjab</p>
//       </div>
//     </div>

//   </div>
// </div>

//           <p className="my-3 px-4 borders-b border-sblack  text-sm font-serif"><span className="font-bold">Order no :</span> {id}</p>
//       <OrderStatusTracker status="shipped" />

//       <div className="w-full flex gap-2 my-3">
//         <div className="w-[48%] border rounded-lg   p-4 shadow-lg">
//           <h3 className="text-lg font-semibold my-3">
//             {} Car Stereo with SatNav BMW 5 Series 2004 – 2010 | V6 | 8.8 Inch
//           </h3>
//           <p className="text-gray-600 text-sm font-serif">black</p>
//           <p>
//             price : <span className="font-sans font-semibold">12,233</span>
//           </p>
//           {/* customer Info */}
//         </div>

//         <div className="w-[48%] border rounded-lg   p-4 shadow-lg">
//           <h3 className="text-lg font-semibold my-3">
//             {} Car Stereo with SatNav BMW 5 Series 2004 – 2010 | V6 | 8.8 Inch
//           </h3>
//           <p className="text-gray-600 text-sm font-serif">black</p>
//           <p>
//             price : <span className="font-sans font-semibold">12,233</span>
//           </p>
//           {/* customer Info */}
//         </div>  
//         {/* <div className="w-full flex"> */}
       
//       </div>
// <OrderSummaryCard subtotal={100} discount={200} total={600}  />
      
//     </div>
//   );
// };

// export default OrderDetailPage;
// // import React from "react";

// const OrderStatusTracker = ({ status }) => {
//   const steps = [
//     { id: 1, name: "Order Placed", key: "placed", icon: CheckCircleIcon },
//     { id: 3, name: "Shipped", key: "shipped", icon: TruckIcon },
//     { id: 5, name: "Delivered", key: "delivered", icon: CheckCircleIcon },
//     { id: 6, name: "Cancelled", key: "cancelled", icon: XCircleIcon },
//   ];

//   const currentStepIndex = steps.findIndex((step) => step.key === status);
//   const isCancelled = status === "cancelled";

//   return (
//     <div className="bg-white rounded-lg shadow p-4 mb-">
//       <div className="flex items-center justify-between relative">
//         {steps.map((step, index) => {
//           const StepIcon = step.icon;

//           const isCompleted = index <= currentStepIndex && !isCancelled;
//           const isCurrent = index === currentStepIndex && !isCancelled;
//           const isDisabled = isCancelled && index > currentStepIndex;

//           return (
//             <div key={step.id} className="flex flex-col items-center flex-1">
//               {/* Line Connector */}
//               {index !== 0 && (
//                 <div
//                   className={`absolute top-5 left-0 w-full h-[2px] ${
//                     isCompleted ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                   style={{ zIndex: 0 }}
//                 />
//               )}

//               {/* Icon */}
//               <div
//                 className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 
//                   ${
//                     isCompleted
//                       ? "bg-green-500 border-green-500 text-white"
//                       : isCurrent
//                       ? "bg-blue-500 border-blue-500 text-white"
//                       : isDisabled
//                       ? "bg-red-500 border-red-500 text-white"
//                       : "bg-gray-100 border-gray-300 text-gray-500"
//                   }`}
//               >
//                 <StepIcon className="w-5 h-5" />
//               </div>

//               {/* Status Text */}
//               <p
//                 className={`mt-1 text-xs text-center font-medium ${
//                   isCompleted
//                     ? "text-green-600"
//                     : isCurrent
//                     ? "text-blue-600"
//                     : isDisabled
//                     ? "text-red-500"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {step.name}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// const OrderSummaryCard = ({ subtotal, discount, total }) => {
//     return (
//       <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm">
//         <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span>Subtotal:</span>
//             <span className="font-medium">${subtotal?.toFixed(2) || "0.00"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Discount:</span>
//             <span className="font-medium text-red-500">-${discount?.toFixed(2) || "0.00"}</span>
//           </div>
//           <div className="border-t pt-2 flex justify-between font-semibold text-base">
//             <span>Total:</span>
//             <span>${total?.toFixed(2) || "0.00"}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };
  

