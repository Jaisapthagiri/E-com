import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const { currency, user, fetchMyOrders, myOrders } = useAppContext();

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  if (!myOrders || myOrders.length === 0) {
    return <p className="text-gray-500 mt-10">No orders yet.</p>;
  }

  return (
    <div className="mt-16 pb-16 px-4 md:px-0">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrders.map((order, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between text-gray-400 font-medium mb-4">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </p>

          {order.items?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-t py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500 text-sm">
                    {currency}
                    {item.product.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium text-black">
                {currency}
                {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
