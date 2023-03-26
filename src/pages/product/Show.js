import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "./../../api/ApiCalls";

export default function Show() {
  const [product, setproduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getProduct(id).then((res) => {
      setproduct(res.data.data);
    });
  }, []);
  console.log(product);
  return (
    <div>
      <div class="card mb-3 ">
        <div class="row g-0">
          <div className="col-md-4">
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                {product.images?.map((image, index) => (
                  <div
                    class={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <img src={image} class="d-block w-100" alt="..." />
                  </div>
                ))}
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>{" "}
          <div class="col-md-8">
            <div class="card-body">
              <div class="card-title col d-flex justify-content-start align-items-center">
                <span> Product Name :</span>{" "}
                <h2 className="ms-2"> {product.name}</h2>
              </div>
              <div class="card-title col d-flex justify-content-start align-items-center">
                <span> Product Price :</span>{" "}
                <h2 className="ms-2">NPR {product.price}</h2>
              </div>
              <div class="card-title col d-flex justify-content-start align-items-center">
                <span> Product Brands :</span>{" "}
                <h2 className="ms-2">
                  {" "}
                  {product.brands?.map((brand) => `${brand}, `)}
                </h2>
              </div>
              <div class="card-title col d-flex justify-content-start align-items-center">
                <span> Product Categories :</span>{" "}
                <h2 className="ms-2">
                  {" "}
                  {product.categories?.map((category) => `${category}, `)}
                </h2>
              </div>
              <div class="card-title col d-flex justify-content-start align-items-center">
                <span> In Stocks :</span>{" "}
                <h2 className="ms-2"> {product.in_stock} remaining</h2>
              </div>
              <p class="card-text">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h2 class="text-light">Reviews</h2>
      {product.reviews?.length != 0 && (
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            {product.reviews?.map((review, index) => (
              <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
                {review}
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      )}

      <hr />
      <h2 class="text-light">Leave Your Review Here</h2>
      <form class="w-50">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Leave Your Opinion</label>
        </div>{" "}
        <div class="col-12">
          <button class="btn btn-outline-success" type="submit">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
