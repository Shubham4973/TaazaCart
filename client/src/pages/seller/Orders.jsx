import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-2xl font-semibold">Orders List</h2>

        {/* Loading */}
        {loading && <p className="text-gray-500">Fetching orders...</p>}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <img
              src={assets.box_icon}
              alt="No Orders"
              className="mx-auto w-20 h-20 opacity-70 mb-4"
            />
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm text-gray-400">
              Your orders will appear here once customers start buying.
            </p>
          </div>
        )}

        {/* Orders */}
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 flex flex-col gap-5 hover:shadow-lg transition-all"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">
                Order ID: <span className="font-medium">{order._id}</span>
              </p>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>

            {/* Order Items */}
            <div className="flex flex-col gap-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b last:border-0 border-gray-200 pb-3 last:pb-0"
                >
                  <img
                    className="w-14 h-14 rounded-md object-cover"
                    src={item.product.image[0] || assets.box_icon}
                    alt={item.product.name || "Product"}
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: <span className="text-primary">{item.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base text-gray-600">
              {/* Address */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-700">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>
                  {order.address.state}, {order.address.zipcode}
                </p>
                <p>{order.address.country}</p>
                <p>{order.address.phone}</p>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Payment Info
                </h3>
                <p>Method: {order.paymentType}</p>
                <p>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Amount */}
              <div className="flex flex-col justify-center text-right md:text-left">
                <p className="text-gray-500">Total Amount</p>
                <p className="text-xl font-semibold text-gray-800">
                  {currency}
                  {order.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
