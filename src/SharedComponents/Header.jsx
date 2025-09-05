import React, { useEffect, useState } from "react";
import Icons from "../Library/Icons";
import Logo from "../Images/Logo.png";
import { Colors } from "../Library/Colors";
import { basefileURL, enc, getList, getUserfromSS, notify, urls } from "../Utils/Config";
import { LuMenu } from "react-icons/lu";

const Header = ({ showNavbar, toggle }) => {
  const [Hospitals, setHospitals] = useState([]);
  const [broken, setBroken] = useState(window.matchMedia("(max-width: 800px)").matches);

  const switchHospital = async (q) => {
    const newRoleId = q == 0 ? 1 : 2;
    // sessionStorage.setItem("user", enc(JSON.stringify({ ...getUserfromSS(), switchedRoleId: newRoleId })));
    // window.location.reload();
    notify(true, "Hospital Switched successfully");
  };

  const uploadPic = async (r, file) => {
    const formData = new FormData();
    formData.append("id", r?.userId);
    formData.append("attachment", file);
    let res = await uploadFile(urls?.User?.uploadProfile, formData);
    if (res?.data?.status == true) {
      let user = getUserfromSS();
      sessionStorage.setItem("user", enc(JSON.stringify({ ...user, image: res?.data?.data })));
      window.location.reload();
    }
  };

  const changeHandlerForProfile = (r) => (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
    if (!validImageTypes.includes(fileType)) notify(false, "Please select image only!!!");
    else uploadPic(r, file);
  };

  const getAllHospitals = async () => {
    let res = await getList(urls?.Hospital?.getAllLabels, {});
    setHospitals(res);
  };

  useEffect(() => {
    getAllHospitals();
  }, []);
  // Written by vinay
  return (
    <header
      className=" d-flex align-items-center justify-content-between "
      style={{ height: "8vh", background: Colors?.themeColor }}
    >
      <div className="   d-flex   " style={{ marginLeft: "90px" }}>
        {!broken && (
          <div className=" border bg-danger">
            <LuMenu color="black" className="pointer" onClick={toggle} title={`${!showNavbar ? "Open Navbar" : "Close Navbar"}`} />
          </div>
        )}
        <img
          src={getUserfromSS()?.logo ? `${basefileURL}/HospitalProfile/${getUserfromSS()?.logo}` : Logo}
          style={{
            objectFit: "contain",
            height: "30px",
            width: "150px",
            maxWidth: "100%",
            maxHeight: "30px",
          }}
          height="30"
          width="150"
        />
      </div>
      <div className="d-flex gap-3">
         
          <div>
            <select
              className="form-select"
              // value={getUserfromSS()?.roleId}
              onChange={(e) => switchHospital(e.target.value)}
            >
              <option value="0">Super Admin</option>
              {Hospitals?.map((e, i) => (
                <option value={e?.value} key={i}>
                  {e?.label}
                </option>
              ))}
            </select>
          </div>
      
        <div className="d-flex gap-2 align-items-center">
          <Icons name={"Notification"} size={25} color="#fff" />{" "}
          <span className="text-white">{getUserfromSS()?.userName}</span>
          {/* <Icons size={35} color="#fff" name={"Profile"} /> */}
          <div className="dropdown">
            <div
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {getUserfromSS()?.empProfile ? (
                <img
                  src={`${basefileURL}/UserProfiles/${getUserfromSS()?.empProfile}`}
                  style={{
                    objectFit: "fill",
                    height: "50px",
                    width: "50px",
                    borderRadius: "100px",
                    border: "1px solid #efefef",
                  }}
                  className="pointer"
                  alt="Employee"
                />
              ) : (
                <Icons size={35} color="#fff" name={"Profile"} />
              )}
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  <Icons name={"Mobile"} size="22" /> <span>{getUserfromSS()?.contactNo}</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icons name={"View"} size="21" />
                  View Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icons name={"LogOut"} size="20" />
                  Change Password
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
