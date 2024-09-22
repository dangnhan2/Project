import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../Service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModaConfirm";
import _ from "lodash";
import "./TableUser.scss";
const TableUser = (props) => {
  const [listUsers, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleClose = () => {
    setIsShowModalAddNewUser(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    //console.log(res);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
      setListUser(res.data);
    }
  };

  // console.log(listUsers);
  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUsers]);
  };

  const handleEditUser = (user) => {
    console.log(user);
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);

    // Update the user's first name
    cloneListUser[index].first_name = user.first_name;

    // Update the state with the modified list
    setListUser(cloneListUser);
  };

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    setIsShowModalDelete(true);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);

    // Update the state with the modified list
    setListUser(cloneListUser);
  };

  // Sort by using lodash
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    console.log(">>>", cloneListUser);
    setListUser(cloneListUser);
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>
          <b>List User:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNewUser(true)}
        >
          Add New User
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <div>ID</div>
                <div className="sort-header-icons">
                  <i
                    className="fa-solid fa-arrow-down-long "
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long "
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </div>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <div>Email</div>
                <div className="sort-header-icons">
                  <i
                    className="fa-solid fa-arrow-down-long "
                    onClick={() => handleSort("desc", "email")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long "
                    onClick={() => handleSort("asc", "email")}
                  ></i>
                </div>
              </div>
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((listUser, index) => (
            <tr key={`user: ${index}}`}>
              <td>{listUser.id}</td>
              <td>{listUser.email}</td>
              <td>{listUser.first_name}</td>
              <td>{listUser.last_name}</td>
              <td>
                <button
                  className="btn btn-warning mx-3 "
                  onClick={() => handleEditUser(listUser)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(listUser)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNewUser
        show={isShowModalAddNewUser}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUser;
