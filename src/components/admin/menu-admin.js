import React from "react";
import { Link } from "react-router-dom";

const MenuAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/user-management">Quản lý người dùng</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/product-management">Quản lý sản phẩm</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MenuAdmin;
