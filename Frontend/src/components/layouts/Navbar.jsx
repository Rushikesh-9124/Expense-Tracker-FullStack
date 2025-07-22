import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-7 py-4 sticky top-0 z-30">
      <button
        className="block min-[1080px]:hidden text-black"
        onClick={() => setOpenSideMenu((prev) => !prev)}
      >
        {
            openSideMenu ? (<HiOutlineX  className='text-2xl' />) : (<HiOutlineMenu className="text-2xl" />)
        }
      </button>
      <h2 className="text-lg pl-3 font-medium text-black">Expense Tracker</h2>
      {
        openSideMenu && 
        <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu={activeMenu} />
        </div>
      }
    </div>
  );
};

export default Navbar;
