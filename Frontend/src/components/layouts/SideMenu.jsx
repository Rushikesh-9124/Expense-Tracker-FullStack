import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return
    }
    navigate(route)
  };
  
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center  gap-2 mb-3">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="m-auto w-25 h-25 rounded-full  bg-slate-400"
          />
        ) : (
          <CharAvatar fullName={user?.fullName} width={20} height={20} style={"text-2xl"} />
        )}
        <h5 className="font-medium text-lg text-center">
          {user?.fullName || ""}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item, idx) => (
        <NavLink
          to={item.path}
          key={`menu_${idx}`}
          className={({ isActive }) =>
          `cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3
           ${isActive ? "text-white bg-primary" : "hover:bg-gray-100"}`
        }
          // onClick={() => handleClick(item.path)}
        >
          <item.icon className="" />
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default SideMenu;
