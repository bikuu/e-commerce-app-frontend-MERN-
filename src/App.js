import PageNotFound from "./pages/404.jsx";
import { Routes, Route } from "react-router-dom";
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
  const user = useSelector((state) => state.value);
  const dispatch = useDispatch();
  const [isLoadingProduct, setisLoadingProduct] = useState(true);
  useEffect(() => {
    getUser().then((res) => {
      dispatch(setUser(res.data));
      setisLoadingProduct(false);
      console.log(res.data);
    });
    let cart_items = localStorage.getItem("cart_items");
    if (cart_items) {
      dispatch(setcart(JSON.parse(cart_items)));
    }
  }, []);

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
      <Navbar />
      <div className="container-fluid">
        <Routes>
          <Route path="" element={<Home />} />
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
