import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../reducer/actions/userActions';

import './Header.scss';

const Header = ({ userInfo }) => {
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <header className="row space-btw">
      <div className="align-items pointer">
        <Link to="/" className="logo">
          TODO LIST
        </Link>
      </div>
      <div className="pointer">
        {userInfo ? (
          <div className="dropdown">
            <div>
              {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
            </div>
            <ul className="dropdown-content">
              <li>
                <div to="/" onClick={signoutHandler}>
                  Sign Out
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
