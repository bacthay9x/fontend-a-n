import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h1 className="text-center">Danh mục : {category?.name}</h1>
        <h1 className="text-center">
          {products?.length} kết quả được tìm thấy
        </h1>
        <div className="d-flex flex-wrap">
          {products?.map((product) => (
            <div
              key={product._id}
              className="card m-2"
              style={{ width: "18rem" }}
            >
              <img
                src={`http://localhost:8000/api/v1/product/product-photo/${product?._id}`}
                className="card-img-top"
                alt={product.name}
                height="200px"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description.substring(0, 30)}...
                </p>
                <p className="card-text">${product.price}</p>
                <button
                  style={{ fontSize: "13px" }}
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  Xem thêm
                </button>
                <button
                  style={{ fontSize: "13px" }}
                  className="btn btn-secondary ms-1"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
