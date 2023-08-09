"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const FireNav = () => {
  const t = useTranslations("Nav");
  const locale = useLocale();
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
            <Link
              href={`/${locale}/`}
              className="nav-link active"
              aria-current="page"
            >
              {t("home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/methodology`}
              className="nav-link active"
              aria-current="page"
            >
              {t("methodology")}
            </Link>
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
