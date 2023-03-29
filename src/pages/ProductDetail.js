import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [realtedProducts, setRealtedProducts] = useState([]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/getProduct/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProduct(data.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //innitalp details
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRealtedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6 mt-4">
          <img
            src={`http://localhost:8000/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width="350px"
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Chi tiết sản phẩm </h1>
          <h4>Tên : {product.name}</h4>
          <h4>Mô tả : {product.description}</h4>
          <h4>Danh mục : {product?.category?.name}</h4>
          <h4>Giá : {product.price}</h4>
          <button className="btn btn-secondary ms-1">Thêm vào giỏ hàng</button>
        </div>
      </div>
      <hr />
      <div className="row mt-3 container">
        <h4>Sản phẩm tương tự</h4>
        {realtedProducts.length < 1 && (
          <p className="text-center">Không có sản phẩm tương tự</p>
        )}
        <div className="d-flex flex-wrap">
          {realtedProducts?.map((product) => (
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

export default ProductDetail;
