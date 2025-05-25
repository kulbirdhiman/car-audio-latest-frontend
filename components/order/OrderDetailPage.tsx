import OrderStatusTracker from "./OrderStatusTracker";
import OrderSummaryCard from "./OrderSummaryCard";

interface OrderDetailPageProps {
  order: {
    id: string;
    status: string;
    date?: string;
    customer?: any;
    items?: any[];
    subtotal?: number;
    discount?: number;
    total?: number;
  } | null;
}

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ order }) => {
  if (!order) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading order details...
      </div>
    );
  }

  const { id, status } = order;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 font-serif">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order #{id}</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
          Ship Order
        </button>
      </div>

      {/* Status Tracker */}
      <OrderStatusTracker status={status} />

      {/* Order Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 bg-white p-6 shadow rounded-lg">
        {/* Customer Info */}
        <div>
          <h3 className="text-md font-semibold border-b pb-2 mb-2">Customer Info</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Name:</strong> John</li>
            <li><strong>Email:</strong> john@gmail.com</li>
            <li><strong>Phone:</strong> 9595959</li>
          </ul>
        </div>

        {/* Billing Address */}
        <div>
          <h3 className="text-md font-semibold border-b pb-2 mb-2">Billing Address</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>kharar afafda afa</li>
            <li>mohali afafa</li>
            <li>punjab afafa</li>
          </ul>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-md font-semibold border-b pb-2 mb-2">Shipping Address</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>kharar</li>
            <li>mohali</li>
            <li>punjab</li>
          </ul>
        </div>
      </div>

      {/* Products List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((item, i) => (
            <div
              key={i}
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200"
            >
              <h3 className="text-md font-semibold">
                Car Stereo with SatNav BMW 5 Series 2004 – 2010 | V6 | 8.8 Inch
              </h3>
              <p className="text-sm text-gray-500">Color: Black</p>
              <p className="text-sm">
                Price: <span className="font-bold">$12,233</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-10">
        <OrderSummaryCard subtotal={100} discount={200} total={600} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
