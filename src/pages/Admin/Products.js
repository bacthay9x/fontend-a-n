import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getAll products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/get-allProduct"
      );
      console.log(data);
      setProducts(data.allProduct);
    } catch (error) {
      console.log(error);
      toast.error("Có gì đó đang lỗi trong quá trình hiển thị sản phẩm");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Tất cả sản phẩm</h1>
          <div className="d-flex">
            {products?.map((product) => (
              <Link
                key={product._id}
                className="product-link card m-2"
                style={{ width: "18rem" }}
                to={`/dashboard/admin/product/${product.slug}`}
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
