import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Icon from '../common/Icon';

interface SidebarItem {
  path: string;
  label: string;
  icon: string;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const sidebarItems: SidebarItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/podcasts', label: 'Podcasts', icon: 'microphone' },
    { path: '/episodes', label: 'Episodes', icon: 'headphones' },
    { path: '/marketing', label: 'Marketing', icon: 'bullhorn' },
    { path: '/analytics', label: 'Analytics', icon: 'chart-bar' },
  ];

  // Add admin-only items if user is an admin
  if (user?.role === 'admin') {
    sidebarItems.push({ path: '/settings', label: 'Settings', icon: 'cog' });
  }

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.path} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`
              }
            >
              <Icon name={item.icon} className="mr-3" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};