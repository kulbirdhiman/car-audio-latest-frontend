const OrderSummaryCard :React.FC<any> = ({ subtotal, discount, total }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">${subtotal?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="font-medium text-red-500">-${discount?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>${total?.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </div>
    );
  };
export default OrderSummaryCard;