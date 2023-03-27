import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageNotFound from "../assets/images/ImageNotFound.jpg";
import { SELLER, BUYER } from "./../constants/role";
export default function Card({ product, handleAddToCart }) {
  const user = useSelector((redux_store) => {
    return redux_store.user.value;
  });
  return (
    <div
      className="col-sm-6 col-md-4 col-lg-3 mb-5"
      style={{ height: "300px" }}
    >
      <Link to={`/products/${product._id}`}>
        <div
          class="card h-100 shadow p-3 mb-5"
          style={{ background: "rgba(0, 164, 180, 0.05) !important" }}
        >
          <img
            src={product.images ? product.images[0] : ImageNotFound}
            class="card-img-top mx-auto h-50"
            style={{ objectFit: "cover" }}
            alt="..."
          />
          <div class="card-body text-success">
            <h5 class="card-title ">{product.name}</h5>
            <p class="card-text">${product.price}</p>
            {user?.role === BUYER ? (
              <button
                class="btn btn-primary"
                type="button"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            ) : user?.role === SELLER ? (
              <>
                <Link to={`/products/edit/${product._id}`}>
                  <button
                    class=" shadow-lg  rounded btn btn-outline-secondary"
                    type="button"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  class="shadow-lg rounded  btn btn-outline-danger mx-2"
                  type="button"
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  );
}
