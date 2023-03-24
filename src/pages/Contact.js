import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="./images/contactus.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">LIÊN HỆ</h1>
          <p className="text-justify mt-2">
            Mọi thắc mắc về sản phẩm, vui lòng liên hệ với chúng tôi theo thông
            tin dưới đây.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@handmadeShop.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (Miễn phí)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
