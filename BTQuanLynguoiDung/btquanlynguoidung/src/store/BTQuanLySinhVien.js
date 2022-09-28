const stateDefault = {
    sinhVien: [{
        id: "1",
        maSV: "123",
        name: "Trần Lê Tuấn Anh",
        numberPhone: 84383999151,
        email: "tuananh16895@gmail.com"
    }, {
        id: "2",
        maSV: "456",
        name: "Hàn Thị Tươi",
        numberPhone: 84582525481,
        email: "hanthituoi@gmail.com"
    },],
    searchUser: null,
    selectedUser: null,
}


export const BTQuanLySinhVien = (state = stateDefault, { type, payload }) => {

    switch (type) {
        case "ADD_USER": {
            const data = [...state.sinhVien]
            const user = { ...payload, id: Date.now() }
            data.push(user)
            return { ...state, sinhVien: data }
        }
        case "EDIT_USER": {
            const user = state.sinhVien.find(item => item.id === payload.id)
            return { ...state, selectedUser: user }
        }
        case "DEL_USER": {
            const data = state.sinhVien.filter(item => item.id !== payload.id)
            return { ...state, sinhVien: data }
        }
        case "UPDATE_USER": {
            const newUserList = state.sinhVien.map((item) =>
                item.id === payload.id ? payload : item
            )
            state.selectedUser = null
            return { ...state, sinhVien: newUserList }
        }
        case "SEARCH_USER": {
            console.log("payload", payload.searchUser.keyWord)
            const value = payload.searchUser.keyWord.toLowerCase()

            const data = state.sinhVien.filter(item => item.name.toLowerCase() === value)
            return { ...state, sinhVien: data }

        }
        default: return state
    }

}