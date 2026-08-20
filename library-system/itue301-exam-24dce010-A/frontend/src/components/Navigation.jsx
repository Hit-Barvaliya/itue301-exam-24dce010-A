import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Books' },
  { to: '/borrow', label: 'Borrow' },
]

function Navigation() {
  return (
    <>
      <Link className="brand" to="/">
        <span className="brand__symbol" aria-hidden="true">+</span>
        <span>Stack &amp; Story</span>
      </Link>
      <nav aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            end={link.end}
            key={link.to}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Navigation
