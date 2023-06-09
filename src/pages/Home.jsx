import { useState, useEffect } from "react";
import { addToCart } from "../redux/slice/cartSlice";
import { allProducts } from "../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "./../api/ApiCalls";
import Card from "../components/Card";

export default function Home({ resultValue }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.value);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const totalPages = Math.ceil(products?.length / limit);
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        dispatch(allProducts(res.data.data[0].data));
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

  function handleDelete(id) {
    deleteProduct(id).then((res) => {
      let newProuct = products.filter((product) => product._id !== id);
      dispatch(allProducts(newProuct));
    });
  }

  function handlePrevClick() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function handleNextClick() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePageClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function getPageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  const pageNumbers = getPageNumbers();
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  let currentProducts;
  if (resultValue !== undefined && resultValue.length > 0) {
    currentProducts = resultValue?.slice(startIndex, endIndex);
  } else {
    currentProducts = products?.slice(startIndex, endIndex);
    console.log("sorry");
  }
  return (
    <>
      <div
        class="d-flex justify-content-between align-items-center text-light mt-2"
        style={{ width: "90%", margin: "auto" }}
      >
        <h2>Products</h2>
        <ul class="pagination justify-content-end align-items-center gap-2 mx-3">
          <li class="page-item  ">
            <button onClick={handlePrevClick} disabled={currentPage === 1}>
              Prev
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li class="page-item" key={pageNumber}>
              <button
                onClick={() => handlePageClick(pageNumber)}
                className={`page-link ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li class="page-item">
            <button
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
      <div className="products row " style={{ width: "90%", margin: "auto" }}>
        {currentProducts?.map((product) => {
          return (
            <Card
              product={product}
              handleAddToCart={handleAddToCart}
              key={product._id}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <ul class="pagination justify-content-center align-items-center gap-2">
        <li class="page-item  ">
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li class="page-item" key={pageNumber}>
            <button
              onClick={() => handlePageClick(pageNumber)}
              className={`page-link ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        <li class="page-item">
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
}
