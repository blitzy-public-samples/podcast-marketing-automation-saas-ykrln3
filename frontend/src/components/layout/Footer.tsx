import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

interface FooterLink {
  path: string;
  label: string;
}

interface SocialLink {
  url: string;
  icon: string;
  label: string;
}

export const Footer: React.FC = () => {
  const footerLinks: FooterLink[] = [
    { path: '/about', label: 'About Us' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const socialLinks: SocialLink[] = [
    { url: 'https://twitter.com/podcastmarketing', icon: 'twitter', label: 'Twitter' },
    { url: 'https://facebook.com/podcastmarketing', icon: 'facebook', label: 'Facebook' },
    { url: 'https://instagram.com/podcastmarketing', icon: 'instagram', label: 'Instagram' },
    { url: 'https://linkedin.com/company/podcastmarketing', icon: 'linkedin', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Podcast Marketing Automation. All rights reserved.</p>
          </div>
          <nav className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex flex-wrap justify-center">
              {footerLinks.map((link) => (
                <li key={link.path} className="mx-2">
                  <Link to={link.path} className="text-sm hover:text-gray-300 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full md:w-1/3 flex justify-end">
            <ul className="flex">
              {socialLinks.map((link) => (
                <li key={link.url} className="ml-4">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <Icon name={link.icon} className="w-6 h-6 fill-current hover:text-gray-300 transition-colors duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Optional newsletter signup form */}
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
          <form className="flex">
            <input type="email" placeholder="Enter your email" className="flex-grow p-2 rounded-l-md" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200">
              Subscribe
            </button>
          </form>
        </div> */}
      </div>
    </footer>
  );
};