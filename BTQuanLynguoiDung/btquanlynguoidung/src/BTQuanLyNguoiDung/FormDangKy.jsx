import React, { Component } from "react";
import { connect } from "react-redux";
class FormDangKy extends Component {
  stateDefault = {
    values: [
      {
        id: "",
        maSV: "",
        name: "",
        numberPhone: "",
        email: "",
      },
    ],
    error: {},
  };

  state = {
    values: this.stateDefault.values,
    error: this.stateDefault.error,
  };

  handleState = (event) => {
    const { name, value } = event.target;

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    this.props.dispatch({
      type: this.props.selectedUser ? "UPDATE_USER" : "ADD_USER",
      payload: this.state.values,
    });

    this.setState({
      values: this.state.values,
    });
  };

  handleBlur = (event) => {
    const {
      title,
      name,
      minLength,
      maxLength,
      validity: { valueMissing, tooShort, patternMismatch },
    } = event.target;

    let mess = "";
    if (patternMismatch) {
      mess = `${title} không đúng định dạng`;
    }

    if (valueMissing) {
      mess = `${title} không được bỏ trống`;
    }
    if (tooShort) {
      mess = `${title} từ ${minLength} đến ${maxLength} ký tự`;
    }
    this.setState({
      error: {
        ...this.state.error,

        [name]: mess,
      },
    });
  };

  static getDerivedStateFromProps = (nextProps, currentState) => {
    console.log("nextProps", nextProps.selectedUser);
    console.log("currentState", currentState);
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    const { maSV, name, numberPhone, email } = this.state.values;

    return (
      <div>
        <form
          noValidate
          className="grid grid-cols-2 gap-5 mt-10"
          onSubmit={this.handleSubmit}
        >
          <div>
            <p>Mã SV</p>
            <input
              required
              type="text"
              name="maSV"
              minLength={4}
              maxLength={10}
              value={maSV}
              title="Mã Sinh Viên"
              className="border-2 p-3 w-full mt-4"
              onFocus={{ style: "border-black rounded-sm" }}
              placeholder="Nhập mã SV"
              onChange={this.handleState}
              onBlur={this.handleBlur}
            />
            <p className="text-red-500 italic">{this.state.error.maSV}</p>
          </div>
          <div>
            <p>Số Điện Thoại</p>
            <input
              required
              type="text"
              name="numberPhone"
              value={numberPhone}
              title="Số điện thoại"
              className="border-2 p-3 w-full mt-4"
              onFocus={{ style: "border-black rounded-sm" }}
              placeholder="Nhập số điện thoại"
              onChange={this.handleState}
              onBlur={this.handleBlur}
            />
            <p className="text-red-500 italic">
              {this.state.error.numberPhone}
            </p>
          </div>
          <div>
            <p>Họ Tên</p>
            <input
              required
              type="text"
              name="name"
              value={name}
              title="Họ tên"
              className="border-2 p-3 w-full mt-4"
              onFocus={{ style: "border-black rounded-sm" }}
              placeholder="Nhập họ tên"
              onChange={this.handleState}
              onBlur={this.handleBlur}
            />
            <p className="text-red-500 italic">{this.state.error.name}</p>
          </div>
          <div>
            <p>Email</p>
            <input
              required
              type="text"
              name="email"
              value={email}
              title="Email"
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              className="border-2 p-3 w-full mt-4"
              placeholder="Nhập Email"
              onFocus={{ style: "border-black rounded-sm" }}
              onChange={this.handleState}
              onBlur={this.handleBlur}
            />
            <p className="text-red-500 italic">{this.state.error.email}</p>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className={`p-4 bg-red-500 rounded-sm text-white cursor-pointer mr-4 ${
                !this.props.selectedUser ? "" : "hidden"
              }`}
            >
              Thêm Sinh Viên
            </button>
            <button
              type="submit"
              className={`p-4 bg-blue-500 rounded-sm text-white cursor-pointer mr-2 ${
                this.props.selectedUser ?? "hidden"
              }`}
              // Dấu "??" trả về 2 giá trị null hoặc undefine
            >
              Cập Nhập
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.BTQuanLySinhVien,
  };
};

export default connect(mapStateToProps)(FormDangKy);
