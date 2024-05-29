import { Link, useMatch, useResolvedPath } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Site Name
      </Link>
      <ul>
        <CustomLink to="/home"> Dashboard</CustomLink>
        <CustomLink to="/student_performance"> Student Performance</CustomLink>
        <CustomLink to="/setting"> Setting</CustomLink>
      </ul>
      <button className="sign-out">Sign Out</button>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
