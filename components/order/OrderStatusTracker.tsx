import {
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    TruckIcon,
  } from "@heroicons/react/24/solid";
import React from "react";
const OrderStatusTracker: React.FC<any>= ({ status }) => {
    const steps = [
      { id: 1, name: "Order Placed", key: "placed", icon: CheckCircleIcon },
      { id: 3, name: "Shipped", key: "shipped", icon: TruckIcon },
      { id: 5, name: "Delivered", key: "delivered", icon: CheckCircleIcon },
      { id: 6, name: "Cancelled", key: "cancelled", icon: XCircleIcon },
    ];
  
    const currentStepIndex = steps.findIndex((step) => step.key === status);
    const isCancelled = status === "cancelled";
  
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
  
            const isCompleted = index <= currentStepIndex && !isCancelled;
            const isCurrent = index === currentStepIndex && !isCancelled;
            const isDisabled = isCancelled && index > currentStepIndex;
  
            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                {/* Line Connector */}
                {index !== 0 && (
                  <div
                    className={`absolute top-5 left-0 w-full h-[2px] ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{ zIndex: 0 }}
                  />
                )}
  
                {/* Icon */}
                <div
                  className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 
                    ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                        ? "bg-blue-500 border-blue-500 text-white"
                        : isDisabled
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
  
                {/* Status Text */}
                <p
                  className={`mt-1 text-xs text-center font-medium ${
                    isCompleted
                      ? "text-green-600"
                      : isCurrent
                      ? "text-blue-600"
                      : isDisabled
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  export default OrderStatusTracker;