import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex mb-5 mt-5 justify-center items-center gap-5 ">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/auth/login">Login</NavLink>
      <NavLink to="/auth/register">Sign up</NavLink>
    </nav>
  );
};

export default Navbar;
