import axios from "axios";
import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/search/${values.keyword} `
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex" role="search">
        <input
          type="text"
          className="form-control me-2"
          typeof="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
