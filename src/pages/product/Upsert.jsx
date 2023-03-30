import React, { useState, useRef } from "react";
import { uploadProducts, updateProduct, getProduct } from "../../api/ApiCalls";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Create() {
  const [product, setproduct] = useState({
    name: "",
    price: "",
    in_stock: "",
    description: "",
    images: [],
    categories: [],
  });

  const { id } = useParams();
  const imageRef = useRef();

  function handleChange(e) {
    setproduct({ ...product, [e.target.name]: e.target.value });
  }

  const onImageChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let img = { ...product, images: [...product.images, ...e.target.files] };
      setproduct(img);
    }
  };
  useEffect(() => {
    if (id) {
      getProduct(id).then((res) => {
        setproduct(res.data.data);
      });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", product.name);
    data.append("price", product.price);
    data.append("description", product.description);
    data.append("in_stock", product.in_stock);

    product.categories.forEach((category) => {
      data.append("categories[]", category);
    });
    if (product.images) {
      product.images.forEach((img) => {
        data.append("images", img);
      });
    }
    try {
      if (id) {
        updateProduct(id, data).then((res) => console.log(res.data));
      } else {
        uploadProducts(data).then((res) => console.log(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addCategory() {
    let temp = product.categories; // []
    temp.push("");

    setproduct({
      ...product,
      categories: temp,
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <div class="mb-3">
          <label class="form-label required-field">Name</label>
          <input
            type="text"
            class="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label class="form-label required-field">price</label>
          <input
            type="number"
            class="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label class="form-label required-field">In Stock</label>
          <input
            type="number"
            class="form-control"
            name="in_stock"
            value={product.in_stock}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
            Categories{" "}
            <button
              class="btn btn-sm mx-2 btn-outline-success"
              onClick={addCategory}
            >
              Add Category{" "}
            </button>
          </label>
          {product.categories.map((category, index) => {
            return (
              <div className="d-flex align-items-center mb-2">
                <input
                  type=""
                  class="form-control  "
                  name=""
                  value={category}
                  onChange={(e) => {
                    let temp = product.categories;
                    temp = temp.map((el, idx) => {
                      if (index == idx) {
                        return e.target.value;
                      }
                      return el;
                    });

                    setproduct({ ...product, categories: temp });
                  }}
                />
                <button
                  className="mx-2  btn btn-danger btn-sm"
                  onClick={() => {
                    let temp = product.categories;
                    temp = temp.filter((el, idx) => {
                      if (index != idx) {
                        return true;
                      }
                      return false;
                    });

                    setproduct({ ...product, categories: temp });
                  }}
                >
                  {" "}
                  -{" "}
                </button>
              </div>
            );
          })}
        </div>
        <div class="mb-3">
          <label class="form-label ">Description</label>
          <textarea
            class="form-control"
            name="description"
            value={product?.description}
            onChange={handleChange}
          />
        </div>

        <div
          onClick={() => imageRef.current.click()}
          style={{
            cursor: "pointer",
            margin: "auto",
            border: "1px solid red",
            marginBottom: "5px",
            width: "50%",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Photo
        </div>
        <div style={{ display: "none" }}>
          <input
            type="file"
            multiple
            name="uploadImg"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
        {product.images && (
          <div>
            {product?.images?.map((image) => {
              let img_src = "";

              if (typeof image == "string") {
                img_src = image;
              } else {
                img_src = URL.createObjectURL(image);
              }

              return <img height={200} width={200} src={img_src} />;
            })}{" "}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
