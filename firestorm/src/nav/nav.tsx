"use client";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const FireNav = () => {
  return (
    <Navbar
      expand="lg"
      style={{ zIndex: 1 }}
      className="bg-body-tertiary position-absolute start-0 end-0 top-0"
    >
      <Container>
        <Navbar.Brand>FireSmoke</Navbar.Brand>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              {/** TODO ADD LINK AND PAGE TO METHODOLOGY */}
              Methodology
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle filters"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </Container>
    </Navbar>
  );
};

export default FireNav;
