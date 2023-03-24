import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 className="mb-5">Người dùng</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Hồ Sơ
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Hàng Đã Đặt
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
