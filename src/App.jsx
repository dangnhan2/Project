import { useState } from "react";
import "./App.scss";
import Header from "./Component/Header";
import TableUser from "./Component/TableUser";
import Container from "react-bootstrap/Container";
import Home from "./Component/Home";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/users" element={<TableUser></TableUser>}></Route>
        </Routes>
        {/* <TableUser /> */}
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
}

export default App;
