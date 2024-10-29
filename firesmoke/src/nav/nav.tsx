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
  const { show, updateShow, resetFocal } = useContext(SidebarContext);
  const pathName = usePathname();

  const pages = [
    { href: `/${locale}/`, label: t("home") },
    { href: `/${locale}/history`, label: t("history") },
    { href: `/${locale}/methodology`, label: "ⓘ" },
  ];

  return (
    <Navbar
      expand="lg"
      style={{ zIndex: 1 }}
      className="bg-body-tertiary position-absolute start-0 end-0 top-0"
    >
      <Container fluid>
        <Navbar.Brand href="http://smokestorm.web.ua.pt">
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
          {pages.map((page) => (
            <li key={page.href + page.label} className="nav-item">
              <Link
                href={page.href}
                className={`nav-link rounded ${
                  [pathName, `${pathName}/`].includes(page.href)
                    ? "active bg-primary"
                    : ""
                }`}
                aria-current="page"
                onClick={resetFocal}
              >
                {page.label}
              </Link>
            </li>
          ))}
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
