import { useState } from "react";
import "./App.scss";
import Header from "./Component/Header";
import TableUser from "./Component/TableUser";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
