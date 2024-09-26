import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Podcasts', path: '/podcasts' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Marketing', path: '/marketing' },
  ];

  const userMenuItems = [
    { label: 'Profile', action: () => {} },
    { label: 'Settings', action: () => {} },
    { label: 'Logout', action: logout },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-bold">Podcast Marketing</span>
        </Link>

        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {user ? (
            <Dropdown
              options={userMenuItems}
              value={user.name}
              onChange={(value) => {
                const selectedItem = userMenuItems.find((item) => item.label === value);
                if (selectedItem) {
                  selectedItem.action();
                }
              }}
            />
          ) : (
            <div className="space-x-2">
              <Button variant="outline" size="small">
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="primary" size="small">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;