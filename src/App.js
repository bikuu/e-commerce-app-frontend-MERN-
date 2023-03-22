import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/404.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { setUser } from "./redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Show from "./pages/product/Show";
import Cart from "./pages/Cart";
import { setcart } from "./redux/slice/cartSlice";
import Create from "./pages/product/Create";
import { getUser } from "./api/ApiCalls";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser().then((res) => {
      dispatch(setUser(res.data));
      console.log(res.data);
    });
    let cart_items = localStorage.getItem("cart_items");
    if (cart_items) {
      dispatch(setcart(JSON.parse(cart_items)));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products">
            <Route index element={<Home />} />
            <Route path=":id" element={<Show />} />
            <Route path="create" element={<Create />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
