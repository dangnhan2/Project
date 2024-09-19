import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../Service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
const TableUser = (props) => {
  const [listUsers, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNewUser(false);
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
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((listUser, index) => (
            <tr key={`user: ${index}}`}>
              <td>{listUser.id}</td>
              <td>{listUser.email}</td>
              <td>{listUser.first_name}</td>
              <td>{listUser.last_name}</td>
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
    </>
  );
};

export default TableUser;
