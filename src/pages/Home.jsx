import { useState, useEffect } from "react";
import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./../api/ApiCalls";
import Card from "../components/Card";

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
      <div class="text-light">list of products</div>
      <div className="products row " style={{ width: "90%", margin: "auto" }}>
        {products?.map((product) => {
          return (
            <Card
              product={product}
              handleAddToCart={handleAddToCart}
              key={product._id}
            />
          );
        })}
      </div>
    </>
  );
}
