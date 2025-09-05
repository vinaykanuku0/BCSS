import React, { lazy, useState } from "react";
import Logo from "../../Images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { navlinks as getNavLinks } from "./SideBarConst";

const SideBar = ({ broken, showSidebar, setShowSidebar }) => {
 
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(null); // Track which submenu is open

  const goto = (item) => {
    navigate(item.link);
    expanded == true && setExpanded(false);
  };

  const sidebarContent = (
    <div className="d-flex flex-column p-3 text-white h-100">
      <div className="mb-4 d-flex align-items-center gap-2">
        <img src={Logo} height={50} alt="Logo" />
        {/* <img src={Name} height={18} alt="Name" /> */}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {getNavLinks()?.map((item, index) => {
          const isExpanded = expanded === index;
          const hasActiveChild = item.child?.some((c) => location?.pathname.split("/").filter(Boolean).slice(0, 3).join("/") === c.link?.split("/").filter(Boolean).slice(0, 3).join("/"));
          return (
            <li key={index}>
              <div className={`nav-link ${location?.pathname.split("/").filter(Boolean).slice(0, 3).join("/") === item?.link?.split("/").filter(Boolean).slice(0, 3).join("/") || hasActiveChild ? "active" : ""}`}
               onClick={() => (item.child ? setExpanded(isExpanded ? null : index) : goto(item))}>
                {item.name}
              </div>

              {item.child && (
                <div className={`submenu-wrapper ${isExpanded ? "open" : ""}`}>
                  <ul className="nav flex-column ms-3 submenu">
                    {item.child.map((child, i) => (
                      <li key={i}>
                        <div className={`nav-link ${location?.pathname.split("/").filter(Boolean).slice(0, 3).join("/") === child?.link.split("/").filter(Boolean).slice(0, 3).join("/") ? "active" : ""}`} onClick={() => navigate(child.link)}>
                          {child.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto">
        <div onClick={() => navigate("/")} className="nav-link">
          Sign Out
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!broken && <div className="sidebarNew">{sidebarContent}</div>}
      {broken && showSidebar && (
        <div className="mobile-sidebarNew-overlay" onClick={() => setShowSidebar(false)}>
          <div className="sidebarNew bg-white" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
