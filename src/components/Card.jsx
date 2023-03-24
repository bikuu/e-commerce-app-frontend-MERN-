import React from "react";
import { Link } from "react-router-dom";
import ImageNotFound from "../assets/images/ImageNotFound.jpg";

export default function Card({ product, handleAddToCart }) {
  return (
    <div className=" col-md-3 mb-5" style={{ height: "300px" }}>
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
            <button
              class="btn  btn-outline-success"
              type="button"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
