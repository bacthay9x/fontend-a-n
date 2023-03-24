import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Rất Tiếng! Trang không tồn tại.</h2>
        <Link to="/" className="pnf-btn">
          Quay Lại
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
