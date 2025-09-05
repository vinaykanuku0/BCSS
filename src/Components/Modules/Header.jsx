import React from "react";
// import Profile from "../../assets/BlueCare/profile.png";
import { CiMenuBurger } from "react-icons/ci";

const Header = ({ broken, toggle, setShowSidebar }) => {
  return (
    <div className=" px-3 py-2 border-bottom bg-white">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex  align-items-center gap-2">
          {broken && (
            <div className="p-2">
              <CiMenuBurger size={28} onClick={() => setShowSidebar(true)} className="cursor-pointer" />
            </div>
          )}
        </div>
        <div className="d-flex gap-3 align-items-center">
          {/* <img src={Profile} height={30} className="" /> */}
          <div >
            <div className=" fw-bold">Admin</div>
            <span className="text-secondary">International Medicine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
