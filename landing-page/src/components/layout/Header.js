import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LogoIcon from '../../svg/LogoIcon';
import Button from '../Button';

const Header = () => (
  <header className="sticky top-0 bg-white shadow">
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
      <div className="flex items-center text-2xl">
        <div className="w-12 mr-3">
          <img src="/logo.png" alt="site banner" style={{ maxWidth: '100%' }} />
        </div>
        <AnchorLink className="px-2" href="#home">
          UmpCast
        </AnchorLink>
      </div>
      <div className="flex mt-4 sm:mt-0">
        <AnchorLink className="px-4" href="#product">
          Product
        </AnchorLink>
        <AnchorLink className="px-4" href="#features">
          Features
        </AnchorLink>
        <AnchorLink className="px-4" href="#testimonials">
          Testimonials
        </AnchorLink>
        <AnchorLink className="px-4" href="#stats">
          Stats
        </AnchorLink>
        <AnchorLink className="px-4" href="#pricing">
          Pricing
        </AnchorLink>
      </div>
      <div className="hidden md:block">
        <a href="http://www.umpirecast.com" target="_blank">
          Login
        </a>
      </div>
    </div>
  </header>
);

export default Header;
