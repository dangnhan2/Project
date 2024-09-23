import { useEffect, useState, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../Service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModaConfirm";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

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
  const [searchEmail, setSearchEmail] = useState("");
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
    // console.log(user);
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
    // console.log(">>>", cloneListUser);
    setListUser(cloneListUser);
  };

  // const handleSearch = (e) => {
  //   let term = e.target.value;
  //   setSearchEmail(term);
  //   if (term) {
  //     console.log("run");
  //     let cloneListUser = _.cloneDeep(listUsers);
  //     (cloneListUser = cloneListUser.filter((item) =>
  //       item.email.includes(term)
  //     )),
  //       setListUser(cloneListUser);
  //   } else {
  //     getUser(1);
  //   }
  // };

  const debouncedSearch = debounce((term) => {
    if (term) {
      console.log("debounced");
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUser(1); // Reload users if the search term is cleared
    }
  }, 2000);

  const handleSearch = (e) => {
    let term = e.target.value;
    setSearchEmail(term); // Update the search input value immediately
    debouncedSearch(term); // Call the debounced function
  };

  // const debouncedSearch = useCallback(
  //   debounce((term) => {
  //     if (term) {
  //       console.log("debounced");
  //       let cloneListUser = _.cloneDeep(listUsers);
  //       cloneListUser = cloneListUser.filter((item) =>
  //         item.email.includes(term)
  //       );
  //       setListUser(cloneListUser);
  //     } else {
  //       getUser(1); // Reload users if the search term is cleared
  //     }
  //   }, 1000),
  //   []
  // );

  // const handleSearch = (e) => {
  //   let term = e.target.value;
  //   setSearchEmail(term); // Update the input field in real-time
  //   debouncedSearch(term); // Call the debounced API function
  // };

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  return (
    <>
      <div className=" my-3 d-flex justify-content-between align-items-center">
        <span>
          <b>List User:</b>
        </span>

        <div>
          <label htmlFor="test" className="btn btn-warning  btn-csv">
            <i className="fa-sharp fa-solid fa-file-import"></i> Import
          </label>
          <input type="file" id="test" hidden />

          <CSVLink
            data={csvData}
            filename={"user.csv"}
            className="btn btn-primary btn-csv"
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>

          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNewUser(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add New
          </button>
        </div>
      </div>

      <div className="col-6 my-3">
        <input
          value={searchEmail}
          type="text"
          placeholder="Search by Email..."
          className="form-control"
          onChange={handleSearch}
        />
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
