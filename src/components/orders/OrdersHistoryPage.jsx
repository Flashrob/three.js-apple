import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constantVariables";
import axios from "axios";
import OrderCard from "./OrderCard";

const OrdersHistoryPage = () => {
  const { user } = useAuth0();
  const [orders, setOrders] = useState([]);

  const fetchOrdersInfo = async () => {
    if (user && user.email) {
      try {
        const response = await axios.get(`${BACKEND_URL}/orders`, {
          params: {
            email: user.email,
          },
        });

        console.log(response.data);
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchOrdersInfo();
  }, [user]);

  console.log(orders);

  const ordersList = orders.map((order) => (
    <div key={order.id}>
      <OrderCard order={order} />
    </div>
  ));

  return (
    <div className="orders-page">
      <Navbar />
      <div className="header">Your orders</div>
      <div className="orders-list">{ordersList}</div>
    </div>
  );
};

export default OrdersHistoryPage;