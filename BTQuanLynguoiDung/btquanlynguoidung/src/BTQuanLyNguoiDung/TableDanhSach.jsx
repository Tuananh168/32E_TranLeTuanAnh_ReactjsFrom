import React, { Component } from "react";
import { connect } from "react-redux";

class TableDanhSach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: "",
    };
  }

  SearchUser = (event) => {
    event.preventDefault();
    // console.log(this.state);

    this.props.dispatch({
      type: "SEARCH_USER",
      payload: this.state,
    });
  };

  handleSearch = (event) => {
    const { name, value } = event.target;
    this.setState({
      searchUser: {
        ...this.state.searchUser,
        [name]: value,
      },
    });
  };

  render() {
    const { sinhVien, keyWord } = this.props;
    // var { keyWord } = this.state;
    return (
      <div>
        <table className="w-full p-6 text-xs text-left whitespace-nowrap mt-10">
          <thead className="bg-black p-5 text-white text-lg">
            <tr className="">
              <th className="p-3">Mã SV</th>
              <th className="p-3">Họ Tên</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Email</th>
              <th className="p-3"></th>
              <th>
                <form onSubmit={this.SearchUser}>
                  <input
                    name="keyWord"
                    value={keyWord}
                    className="p-2 text-black rounded-sm"
                    placeholder="Search"
                    onChange={this.handleSearch}
                  />
                  <button
                    type="submit"
                    className="text-white p-2 rounded-sm bg-green-500"
                  >
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
              </th>
            </tr>
          </thead>
          <tbody className="border-b text-lg">
            {sinhVien.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.maSV}</td>
                  <td>{item.name}</td>
                  <td>{item.numberPhone}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        this.props.dispatch({
                          type: "EDIT_USER",
                          payload: item,
                        })
                      }
                      className="bg-blue-700 p-2 rounded-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        this.props.dispatch({
                          type: "DEL_USER",
                          payload: item,
                        })
                      }
                      className="bg-red-700 p-2 ml-2 rounded-sm"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sinhVien: state.BTQuanLySinhVien.sinhVien,
  };
};

export default connect(mapStateToProps)(TableDanhSach);
