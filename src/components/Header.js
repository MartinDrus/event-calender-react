import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { userLogout } from "../service/eventProvider.js";
import { userStatus } from "../service/checkStatus";

const Header = () => {
  let status = useContext(UserContext);
  const [canLogout, setCanLogout] = useState(status.success)
  const [checkStatus, setChange] = useState(false)

  useEffect(()=> {
    const fetchStatus = async () => {
      let newStatus = await userStatus();
      setCanLogout(newStatus.success);
    };
    fetchStatus().catch(console.error);
  });

  let location = useLocation()
  let isNotHome = (location.pathname !== '/')
  let isNotLogin = (location.pathname !== '/login')
  let isNotRegister = (location.pathname !== '/register')

  const [show, setShow] = useState(false);

  const handleSth = (e) => {
    setChange(!checkStatus)
    if (e.target.value === 0) {
      setShow(false);
    } else setShow(!show);
  };

  const handleLogout = async (e) => {
    let response = await userLogout();
    let test = await  userStatus()
    setCanLogout(!response.success)

    setChange(!checkStatus)
    if (e.target.value === 0) {
      setShow(false);
    } else setShow(!show);

  }

let isAdmin = status.message === "admin";
let createEvent = isAdmin ? 
(<NavLink to="/erstellen">
    <li onClick={handleSth}>Event erstellen</li>
  </NavLink>
) : "";

let showHomeNav = isNotHome ? 
(<NavLink to="/">
  <li onClick={handleSth}>Home</li>
</NavLink>) : '';

let showLoginPath = isNotLogin ? 
(<NavLink to="/login">
<li onClick={handleSth}>Login</li>
</NavLink>) : '';

let showRegisterPath = isNotRegister ? 
(<NavLink to="/register">
<li onClick={handleSth}>Register</li>
</NavLink>) : '';

let logout = (<NavLink to="/">
<li onClick={handleLogout}>Logout</li>
</NavLink>)


let logRegOrLogout = canLogout ? 
<>
  {showHomeNav}
  {logout}
  {createEvent}
</>
 : 
<>
  {showHomeNav}
  {showRegisterPath}
  {showLoginPath}
  {createEvent}
</>

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input checked={show} onClick={handleSth} readOnly type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          {logRegOrLogout}
        </ul>
      </div>
      <div className="navbar-desktop">
        {logRegOrLogout}
      </div>
    </nav>
  );
};

export default Header;
