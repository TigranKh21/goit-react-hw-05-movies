import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './SharedLayout.module.css';

export const SharedLayout = ({ children }) => {
  return (
    <div>
      <header className={css.headerBtns}>
        <NavLink
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </header>
      <main>{children}</main>
    </div>
  );
};
