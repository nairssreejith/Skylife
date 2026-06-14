import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-wide">
          Skylife
        </Link>
        <nav className="hidden md:flex gap-8 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'text-gold' : 'text-bone/80 hover:text-bone'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
