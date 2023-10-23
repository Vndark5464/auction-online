import React from "react";
import { Link } from "react-router-dom";

const MenuAdmin = () => {
    return (
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <Link to = "/admin" className="list-group-item list-group-item-action active" aria-current="true">
                Dashboard
              </Link>
              <Link to = "/user-management" className="list-group-item list-group-item-action">Quản lý người dùng</Link>
              <Link to = "/admin" className="list-group-item list-group-item-action">Quản lý sản phẩm</Link>
            </div>
          </div>
        </div>
      </div>
    );
}
export default MenuAdmin ;