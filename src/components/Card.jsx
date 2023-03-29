import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/ApiCalls";
import ImageNotFound from "../assets/images/ImageNotFound.jpg";
import { SELLER, BUYER } from "./../constants/role";
export default function Card({ product, handleAddToCart, handleDelete }) {
  const user = useSelector((redux_store) => {
    return redux_store.user.value;
  });

  return (
    <div
      className="col-sm-6 col-md-4 col-lg-3 mb-5"
      style={{ height: "max-content" }}
    >
      <div
        class="card shadow p-3 mb-5"
        style={{ background: "rgba(0, 164, 180, 0.05) !important" }}
      >
        <Link to={`/products/${product._id}`}>
          <div style={{ height: "200px" }}>
            <img
              src={product.images ? product.images[0] : ImageNotFound}
              class="card-img-top h-100"
              style={{ objectFit: "cover" }}
              alt="..."
            />
          </div>
        </Link>

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
          ) : user?.role === SELLER && user._id === product.user._id ? (
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
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
