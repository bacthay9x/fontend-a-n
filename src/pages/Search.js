import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Kết quả tìm kiếm</h1>
          <h6>
            {values.results.length < 1
              ? "Không tìm thấy sản phẩm"
              : ` Tìm thấy ${values.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results.map((value) => (
              <div
                key={value._id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${value?._id}`}
                  className="card-img-top"
                  alt={value.name}
                  height="200px"
                />
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                  <p className="card-text">
                    {value.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">${value.price}</p>
                  <button
                    style={{ fontSize: "13px" }}
                    className="btn btn-primary ms-1 "
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
      </div>
    </Layout>
  );
};

export default Search;
