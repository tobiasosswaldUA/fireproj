"use client";
import { SidebarContext } from "@/sidebar/sidebar-context";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FireNav = () => {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const { show, updateShow } = useContext(SidebarContext);
  const pathName = usePathname();

  return (
    <Navbar
      expand="lg"
      style={{ zIndex: 1 }}
      className="bg-body-tertiary position-absolute start-0 end-0 top-0"
    >
      <Container fluid>
        <Navbar.Brand>
          <Image
            alt="SmokeStorm"
            src="/smokestorm_logo.jpg"
            width={53}
            height={30}
          ></Image>
        </Navbar.Brand>
        <ul
          id="main-nav-bar"
          className="navbar-nav me-auto d-flex flex-row gap-2"
        >
          <li className="nav-item">
            <Link
              href={`/${locale}/`}
              className={`nav-link ${
                pathName === `/${locale}` ? "active" : ""
              }`}
              aria-current="page"
            >
              {t("home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/history`}
              className={`nav-link ${
                pathName === `/${locale}/history` ? "active" : ""
              }`}
              aria-current="page"
            >
              {t("history")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/methodology`}
              className={`nav-link ${
                pathName === `/${locale}/methodology` ? "active" : ""
              }`}
              aria-current="page"
            >
              {t("methodology")}
            </Link>
          </li>
          <li className="nav-item">
            <a
              href={`http://smokestorm.web.ua.pt`}
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {t("smokestorm")}
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle filters"
          onClick={() => updateShow(!show)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </Container>
    </Navbar>
  );
};

export default FireNav;
