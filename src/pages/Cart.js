import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cart_items = useSelector((redux_store) => redux_store.cart_items.value);

  const totalPrice = cart_items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalQuantity = cart_items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <div>
      <table class="table caption-top">
        <caption>Shopping Carts</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart_items?.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              Total
            </td>
            <td>{totalPrice}</td>
            <td>{totalQuantity}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
