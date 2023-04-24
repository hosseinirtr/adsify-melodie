import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { links } from '../../routes/links';
import './sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const path = useMemo(
    () => decodeURIComponent(location.pathname.replace(/\/$/, '')),
    [location],
  );

  const checkMenuActive = (url) => (url === path ? 'active' : '');

  useEffect(() => {
    checkMenuActive();
  }, [path]);

  return (
    <div id="sidebar">
      <div>
        <img className="sidebar-logo" src={logo} alt="Melodie Logo" />
      </div>
      <nav>
        <ul>
          {links.map(({ to, name }, index) => (
            <li key={index}>
              <Link
                className={`sidebar-item ${checkMenuActive(`/app/${to}`)}`}
                to={`/app/${to}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="font-bold ml-8 mt-9">Playlist</p>
        <ul></ul>
      </nav>
    </div>
  );
}
