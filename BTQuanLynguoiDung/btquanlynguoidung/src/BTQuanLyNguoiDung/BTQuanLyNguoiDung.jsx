import React, { Component } from "react";
import FormDangKy from "./FormDangKy";
import TableDanhSach from "./TableDanhSach";

export default class BTQuanLyNguoiDung extends Component {
  render() {
    return (
      <div className="container-lg mx-auto px-10">
        <div className="p-5 bg-black text-white text-2xl">
          Thông tin sinh viên
        </div>
        <FormDangKy />
        <TableDanhSach />
      </div>
    );
  }
}
