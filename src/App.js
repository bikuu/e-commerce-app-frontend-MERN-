import PageNotFound from "./pages/404.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUser } from "./redux/slice/userSlice";
import { setcart } from "./redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Show from "./pages/product/Show";
import Cart from "./pages/Cart";
import Upsert from "./pages/product/Upsert";
import Navbar from "./components/navbar/Navbar";
import { getUser } from "./api/ApiCalls";
import "./App.css";
function App() {
  const [searchResult, setsearchResult] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.value);

  const [isLoadingProduct, setisLoadingProduct] = useState(true);
  let accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      getUser().then((res) => {
        dispatch(setUser(res.data));
        setisLoadingProduct(false);
        console.log(res.data);
      });
      let cart_items = localStorage.getItem("cart_items");
      if (cart_items) {
        dispatch(setcart(JSON.parse(cart_items)));
      }
    } else {
      navigate("/login");
      setisLoadingProduct(false);
    }
  }, []);
  let resultValue;
  if (searchResult) {
    resultValue = products.filter((product) => product.name === searchResult);
  }
  if (isLoadingProduct) {
    return (
      <>
        <div
          className="home-spinner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar setsearchResult={setsearchResult} />
      <div className="container-fluid">
        <Routes>
          <Route path="" element={<Home resultValue={resultValue} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products">
            <Route index element={<Home />} />
            <Route path=":id" element={<Show />} />
            <Route path="edit/:id" element={<Upsert />} />
            <Route path="create" element={<Upsert />} />{" "}
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
