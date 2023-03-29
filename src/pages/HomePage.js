import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/getAllCategory"
      );
      if (data.success) {
        setCategories(data.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có gì đó đang lỗi khi tạo danh mục");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        " http://localhost:8000/api/v1/product/product-count"
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMode();
  }, [page]);
  //load more
  const loadMode = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslin-disable-next-line
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Handmade Shop"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2 ">
          <h4 className="text-center">Lọc theo danh mục</h4>
          <div className="d-flex flex-column">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter*/}
          <h4 className="text-center mt-4">Lọc theo giá tiền</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Tìm kiếm lại
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">Tất cả sản phẩm</h1>
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
                    onClick={() => navigate(`product/${product.slug}`)}
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Đang tải ..." : "Nhiều hơn"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
