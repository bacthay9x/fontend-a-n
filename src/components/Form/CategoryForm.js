import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Thêm sản phẩm mới"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
