import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
  {
    id: "dialysedaten",
    text: "Dialysedaten",
    link: "/",
    auth: true,
    role: "patient",
  },
  {
    id: "medikationsplan",
    text: "Medikationsplan",
    link: "/medikationsplan",
    auth: true,
    role: "patient",
  },
  {
    id: "beratung",
    text: "Beratung",
    link: "/beratung",
    auth: true,
    role: "patient",
  },
  {
    id: "patienten",
    text: "Patienten",
    link: "/",
    auth: true,
    role: "arzt",
  },
  {
    id: "termine",
    text: "Beratungstermine",
    link: "/beratungstermine",
    auth: true,
    role: "arzt",
  },
  { id: "login", text: "Anmelden", link: "/", auth: false },
  { id: "signup", text: "Registrieren", link: "/signup", auth: false },
];

const navigationItems = (props) => [
  ...navItems
    .filter((item) => item.auth === props.isAuth && item.role === props.role)
    .map((item) => (
      <li
        key={item.id}
        className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
      >
        <NavLink to={item.link} exact onClick={props.onChoose}>
          {item.text}
        </NavLink>
      </li>
    )),

  props.isAuth && (
    <li className="navigation-item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  ),
];

export default navigationItems;
