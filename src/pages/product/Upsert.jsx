import React, { useState, useRef } from "react";
import { uploadProducts } from "../../api/ApiCalls";

export default function Create() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  const [image, setImage] = useState([]);
  const imageRef = useRef();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onImageChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let img = [...image, ...e.target.files];
      setImage(img);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    // const filename = Date.now() + image.name;
    data.append("name", formData.name);
    data.append("price", formData.price);
    if (image) {
      image.forEach((img) => {
        data.append("images", img);
      });
    }
    try {
      uploadProducts(data).then((res) => console.log(res.data));
      setImage(null);
      setFormData({
        name: "",
        price: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <div className="mb-3">
          <label className="form-label required-field">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label required-field">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
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
        {/* {image && (
          <div onClick={() => setImage(null)}>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )} */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
