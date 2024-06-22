import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <>
      <header>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            HomePage
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            MoviesPage
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
