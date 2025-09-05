import React, { useMemo } from "react";
import { AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize, MdAdminPanelSettings, MdOutlineMail,MdOutlineToggleOff,MdOutlineToggleOn  } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";
import { BsPersonAdd, BsFillCloudArrowDownFill } from 'react-icons/bs';
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLock } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go'
import { CiMobile4 } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
const Icons = ({ name, ...rest }) => {
  const iconsMapping = useMemo(
    () => ({
      Dashboard: AiOutlineDashboard,
      Menu: IoMenuSharp,
      Masters: MdOutlineDashboardCustomize,
      Back: IoMdArrowRoundBack,
      Close: AiOutlineClose,
      View: AiOutlineEye,
      hospitalAdmin: MdAdminPanelSettings,
      imagePlus: TbCameraPlus,
      consultation: BsPersonAdd,
      Notification: FaRegBell,
      Profile: CgProfile,
      Downlode: BsFillCloudArrowDownFill,
      Email: MdOutlineMail,
      fiLock: FiLock,
      Mobile: CiMobile4,
      LogOut: GoSignOut,
      ToggleOn:MdOutlineToggleOn,
      ToggleOff:MdOutlineToggleOff
    }),
    []
  );
  const Icon = iconsMapping[name] ?? null;
  return Icon ? <Icon {...rest} className='pointer' /> : <></>;
};
export default Icons;