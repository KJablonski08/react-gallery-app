import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/elephant'>Elephants</NavLink></li>
        <li><NavLink to='/lion'>Lions</NavLink></li>
        <li><NavLink to='/leopard'>Leopards</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;