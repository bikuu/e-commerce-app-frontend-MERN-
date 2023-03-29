import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BUYER } from "../../constants/role";
import { getProduct, updateProduct } from "./../../api/ApiCalls";
import { useSelector } from "react-redux";
import Rating from "react-rating";

export default function Show() {
  const [product, setproduct] = useState({});
  const { id } = useParams();
  const [ratingValue, setRatingValue] = useState(0);

  const user = useSelector((redux_store) => {
    return redux_store.user.value;
  });

  function fetchProductDetail() {
    getProduct(id).then((res) => {
      setproduct(res.data.data);
    });
  }

  useEffect(() => {
    fetchProductDetail();
  }, []);

  function updateReview(e) {
    e.preventDefault();
    const reviewData = { rating: ratingValue, comment: e.target.comment.value };
    updateProduct(id, reviewData).then((res) => {
      fetchProductDetail();
    });
  }

  console.log(product);
  return (
    <div>
      <div class="card mb-3 ">
        <div class="row g-0">
          <div className="col-md-4">
            <div
              id="carouselExampleControls"
              class="carousel carousel-dark slide "
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                {product.images?.map((image, index) => (
                  <div
                    class={` carousel-item ${
                      index === 0 ? "active" : ""
                    }`}
                    key={index}
                  >
                    <img
                      src={image}
                      class="d-block w-100 "
                      style={{ height: "300px", objectFit: "contain" }}
                      alt="..."
                    />
                  </div>
                ))}
              </div>
              <button
                class=" carousel-control-prev  "
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon  "
                  aria-hidden="true"
                ></span>
                <span class=" visually-hidden ">Previous</span>
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
                <span> Average Rate :</span>{" "}
                <Rating
                  initialRating={product.avg_rating}
                  emptySymbol={<i class="fa-regular fa-star fa-2xl"></i>}
                  fullSymbol={<i class="fa-solid fa-star fa-2xl"></i>}
                  readonly
                />
              </div>
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
      <h2 class="text-light">Latest Reviews</h2>

      {product.reviews?.length != 0 ? (
        <div class="row w-50">
          {product.reviews?.map((review) => {
            let temp = [];

            for (let i = 0; i < review.rating; i++) {
              temp.push("");
            }
            return (
              <>
                <div class="col-sm-6">
                  <div class="card text-center ">
                    <div
                      className="d-block w-100 "
                      style={{
                        boxShadow: "1px 1px 10px 0px grey",
                      }}
                    >
                      <p className="mb-0">
                        {review.created_by.name}{" "}
                        {temp.map((el) => {
                          return <i class="fa-solid fa-star"></i>;
                        })}{" "}
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <p class="text-light">no reviews yet</p>
      )}

      <hr />
      {user?.role == BUYER && (
        <>
          <h2 class="text-light">Leave Your Review Here</h2>
          <form class="w-50 text-light" onSubmit={updateReview}>
            <div class="form-label mb-3">
              <Rating
                initialRating={ratingValue}
                onChange={(e) => {
                  setRatingValue(e);
                }}
                emptySymbol={<i class="fa-regular fa-star fa-2xl"></i>}
                fullSymbol={<i class="fa-solid fa-star fa-2xl"></i>}
              />
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                name="comment"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2" class="text-dark">
                Leave Your Opinion
              </label>
            </div>{" "}
            <div class="col-12">
              <button class="btn btn-outline-success" type="submit">
                Submit Review
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
