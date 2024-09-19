import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../Service/UserService";
import ReactPaginate from "react-paginate";
const TableUser = (props) => {
  const [listUsers, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    console.log(res);
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
  return (
    <>
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
    </>
  );
};

export default TableUser;
