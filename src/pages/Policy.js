import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/policy.png
            "
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <ul>
            <li>
              {" "}
              Công ty cam kết sẽ quản lý thông tin cá nhân dưới sự kiểm soát cẩn
              trọng.
            </li>
            <li>
              Công ty có đội ngũ nhân viên chịu trách nhiệm giám sát việc tuân
              thủ các Nguyên tắc Bảo mật của Công ty.
            </li>
            <li>
              Công ty sẽ đảm bảo thông tin về chính sách bảo mật và thực tiễn
              việc quản lý thông tin cá nhân của công ty dễ dàng truy cập dành
              cho khách hàng.
            </li>
            <li>
              Công ty sẽ bảo vệ thông tin cá nhân của khách hàng bằng những
              phương thức bảo vệ an ninh phù hợp với mức độ quan trọng của thông
              tin, ngăn chặn hành vi truy cập, công bố, sửa đổi hoặc sử dụng
              thông tin trái phép
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
