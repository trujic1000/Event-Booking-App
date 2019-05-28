import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from '../context/auth-context';

const MainNavigation = () => {
  const {
    state: { token },
    logout
  } = useAuthState();
  return (
    <NavContainer>
      <div className="main-nav-logo">
        <h2>Eventim</h2>
      </div>
      <nav className="main-nav-items">
        <ul>
          {!token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {token && (
            <>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </NavContainer>
  );
};

const NavContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: #01d1d1;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .main-nav-logo {
    margin: 0;
    font-size: 1.2rem;
  }

  .main-nav-items {
    margin-right: 2rem;
  }

  .main-nav-items ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    align-items: center;
  }

  .main-nav-items ul li {
    margin: 0 1rem;
  }

  .main-nav-items ul li a,
  .main-nav-items ul li button {
    text-decoration: none;
    color: #000;
    padding: 0.25rem 0.5rem;
    margin: 0;
    border: none;
    font: inherit;
    background: transparent;
    cursor: pointer;
  }

  .main-nav-items ul li a:hover,
  .main-nav-items ul li a:active,
  .main-nav-items ul li a.active,
  .main-nav-items ul li button:hover,
  .main-nav-items ul li button:active {
    color: #fff;
  }
`;

export default MainNavigation;
