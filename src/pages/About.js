import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Handmade Shop"}>
      <div className="row contactus ">
        <div className="col-md-6" style={{ height: "300px", width: "300px" }}>
          <img
            src="/images/handmade.png"
            alt="contactus"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="col-md-5">
          <p className="text-justify mt-2">
            Đồ handmade là sản phẩm không còn xa lạ gì với đời sống hàng ngày
            của chúng ta. Đặc biệt, hiện nay nó còn được ưa chuộng hơn rất nhiều
            so với những món đồ đại trà, gia công máy móc. Với sự tỉ mỉ cùng với
            chất lượng được đảm bảo mà nhiều người thích sử dụng những món đồ
            handmade với nhiều mục đích khác nhau. Kinh doanh đô handmade là một
            trong những ý tưởng kiếm tiền hay và mang lại nguồn doanh thu cao,
            ổn định cho người kinh doanh.Hiện nay mô hình kinh doanh đồ handmade
            khá phổ biến và được cho làm ý tưởng kinh doanh mang lại nhiều hiệu
            quả.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
