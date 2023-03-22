import { useState, useEffect } from "react";
import ImageNotFound from "../assets/images/ImageNotFound.jpg";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./../api/ApiCalls";

export default function Home() {
  const dispatch = useDispatch();
  const [products, setproducts] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setproducts(res.data.data[0].data);
        console.log(res.data.data[0].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddToCart(e, product) {
    e.preventDefault();

    dispatch(addToCart(product));
  }

  return (
    <>
      <div>list of products</div>
      <div className="products row">
        {products?.map((product) => {
          return (
            <div className="col-sm-6  col-md-3 p-3" key={product._id}>
              <Link to={`/products/${product._id}`}>
                <div class="card ">
                  <img
                    src={product.images ? product.images[0] : ImageNotFound}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title ">{product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <button
                      class="btn btn-primary"
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
        })}
      </div>
    </>
  );
}
