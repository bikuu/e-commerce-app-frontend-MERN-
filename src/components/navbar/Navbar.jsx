import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slice/userSlice";
import defaultImg from "../../assets/images/pets.jpg";
import { useState } from "react";
import { BUYER, SELLER } from "../../constants/role";
export default function Navbar() {
  const user = useSelector((redux_state) => redux_state.user.value);
  const cart_items = useSelector((redux_state) => redux_state.cart_items.value);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem("access_token")
    dispatch(logout());
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm   sticky-top  bg-dark text-light">
      <div class="container-fluid d-flex   justify-content-around align-items-center   ">
        <Link
          class="navbar-brand text-success mb-0 fs-3 fw-bolder p-3 mx-2 "
          to=""
        >
          E-Commerce
        </Link>

        <form class=" d-flex justify-content-center align-items-center w-50 p-3">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        {!user ? (
          <div class="d-flex justify-content-end align-items-center">
            <Link to="/login">
              <button
                type="button"
                class="btn btn-dark btn-outline-success me-2 "
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button type="button" class="btn btn-dark btn-outline-success ">
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <div class="d-flex justify-content-end align-items-center">
            {user?.role !== SELLER ? (
              <Link to="/cart">
                <button
                  type="button"
                  class="btn btn-dark btn-outline-success mx-5 h-25 "
                >
                  Cart({cart_items.length})
                </button>
              </Link>
            ) : (
              <Link to="/products/create">
                <button
                  type="button"
                  class="btn btn-dark btn-outline-success mx-5 h-25 "
                >
                  Create Post{" "}
                </button>
              </Link>
            )}

            <div
              class=" position-relative"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setShow((prev) => !prev)}
            >
              <img
                src={defaultImg}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid limeGreen",
                }}
              />
              <span
                class="position-absolute"
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  top: "2px",
                  right: "-1px",
                  background: "limeGreen",
                  border: "1px solid green",
                }}
              ></span>
              {!show && (
                <i
                  class="fa-sharp fa-solid fa-arrow-down fa-2xl text-success position-absolute"
                  style={{
                    bottom: "9px",
                    right: "-5px",
                    fontSize: "15px",
                  }}
                ></i>
              )}
              {show && (
                <>
                  <i
                    class="fa-sharp fa-solid fa-arrow-up fa-2xl text-success position-absolute"
                    style={{
                      bottom: "9px",
                      right: "-5px",
                      fontSize: "15px",
                    }}
                  ></i>
                  <div
                    class="d-flex flex-column align-items-start position-absolute"
                    style={{
                      bottom: "-460%",
                      right: "-2px",
                      width: "max-content",
                      background: "#232f3e56",
                      marginTop: "50px",
                      zIndex: "1000",
                      borderRadius: "5px",
                    }}
                  >
                    <button
                      class="m-2 btn-outline-success align-self-start"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      Switch to {user?.role === SELLER ? BUYER : SELLER}
                    </button>
                    <div class="align-self-end d-flex justify-content-center align-items-center mx-2">
                      <img
                        src={defaultImg}
                        alt=""
                        style={{
                          width: "43px",
                          height: "43px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1px solid limeGreen",
                        }}
                      />
                      <button class="btn-outline-success border border-info  mb-1 mx-2">
                        Profile
                      </button>
                    </div>
                    <div class="align-self-start d-flex justify-content-center align-items-center ">
                      <button class="btn-outline-success border border-info  mb-1 ms-3">
                        Settings
                      </button>
                      <i
                        class="fa-solid fa-gear fa-spin fa-2x mx-2"
                        style={{ color: "limeGreen" }}
                      ></i>
                    </div>
                    <div class="align-self-end d-flex justify-content-end align-items-center ">
                      <i
                        class="fa-solid fa-arrow-right-from-bracket fa-2x ms-2"
                        style={{ color: "limeGreen" }}
                      ></i>
                      <button
                        class="btn-outline-success border border-info  mb-1 mx-3"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
