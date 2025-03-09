import { NavLink } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div>
        <h2>Logo</h2>
      </div>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/register-formik">register-formik</NavLink>
        <NavLink to="/tutorial">tutorial</NavLink>

      </div>
    </nav>
  );
};

export default Navbar;
