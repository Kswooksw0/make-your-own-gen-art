import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext.js";

const NavBar = ({setIsNavbarOpen}) => {

  const navigate = useNavigate();
  const setUser = useUserContext(); 
  
  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setUser(false);
    navigate("/");
  };

  return (
    <div class="h-full w-full p-8 text-white text-xl font-noto bg-dark-black">
        <div onClick={() => setIsNavbarOpen((isNavBarOpen) => !isNavBarOpen)} class="mb-8">
            <img src="/img/cross.png" alt="..." />
        </div>
      <ul class="flex flex-col items-start">
        <li class="mb-6 hover:text-2xl">
          <Link to="/gallery">My Gallery</Link>
        </li>
        <li class="mb-6 hover:text-2xl">
          <Link to="/homepage">Home</Link>
        </li>
        <li class="mb-6 hover:text-2xl">
          <button onClick={handleLogOut}>Log out</button>
        </li>
      </ul>

    </div>
  );
};

export default NavBar;
