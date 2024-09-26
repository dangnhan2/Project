import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import broCode from "../assets/broCode.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = (props) => {
  let navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      toast.success("Logout succeeded");
      navigate("/");
    }
  };
  return (
    <>
      <Container className="bg-light">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand className="">
            <img src={broCode} alt="logo" width="40" height="40" />
            <span> Đăng Nhân's App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Manage User
              </NavLink>
            </Nav>

            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink
                    to="/logout"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
};
export default Header;
