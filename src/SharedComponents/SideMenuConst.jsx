import { PiBuildingOffice, PiNote, PiTestTubeBold, PiUsersThreeFill } from "react-icons/pi";
import { MdDashboardCustomize, MdOutlineFreeCancellation } from "react-icons/md";
import { LuBookCheck, LuClipboardType } from "react-icons/lu";
import Icons from "../Library/Icons";
import { getUserfromSS } from "../Utils/Config";
import { FiUserPlus } from "react-icons/fi";
import { ImLab } from "react-icons/im";
import { GiTestTubes } from "react-icons/gi";
import { FaBriefcaseMedical, FaFileInvoice, FaRegCalendarAlt } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { RiFileSettingsLine } from "react-icons/ri";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const roleId = getUserfromSS()?.roleId;
const profileName = getUserfromSS()?.profileName;
console.log(profileName, "profileName");
console.log(roleId, "profileName");


const navKey = (() => {
  if (roleId === 11) return "LAB_ADMIN";
  if (profileName === "DOCTORS") return "DOCTOR";
  if (profileName === "DISCHARGESUMMARY USER") return "DISCHARGESUMMARY USER";
  if (profileName === "MATERIAL REQUSET" || profileName === "NS-USER" || profileName === "NS-ADMIN") return "MATERIAL";
  if (roleId === 10) return "LAB_CONSULTANT";
  if (profileName === "FRONTOFFICE ADMIN") return "FRONTOFFICE ADMIN";
  if (profileName == "SUPER USER"&&Number(roleId) !== 1) return "ADMIN";
  if (Number(roleId) === 1) return "SUPERUSER";
  return "DEFAULT";
})();

export const sidenavbar = (() => {
  switch (navKey) {
    case "LAB_ADMIN":
      return [
        {
          linkName: "Lab Masters",
          name: "Lab Masters",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "Specimen",
              name: "Specimen",
              icon: <PiTestTubeBold size={20} />,
              route: "/v/lab/specimen/all-specimen",
            },
            {
              linkName: "Parameter Setup",
              name: "Parameter Setup",
              icon: <TbAdjustmentsHorizontal size={20} />,
              route: "/v/lab/parameter/all-parametersetup",
            },
            {
              linkName: "Test Formate Setup",
              name: "Test Formate Setup",
              icon: <RiFileSettingsLine size={20} />,
              route: "/v/lab/testformatesetup/all-testparametesetup",
            },
          ],
        },
        {
          linkName: "Samplecollection",
          name: "Sample Collection",
          icon: <ImLab size={20} />,
          route: "/v/lab/samplecollection",
        },
        {
          linkName: "Samplereceived",
          name: "Sample Received",
          icon: <GiTestTubes size={20} />,
          route: "/v/lab/samplereceived",
        },
        {
          linkName: "LabresultEntry",
          name: "Lab Test Result Entry",
          icon: <LuClipboardType size={20} />,
          route: "/v/lab/labresultentry",
        },
        {
          linkName: "vitalsentry",
          name: "Vitals Entry",
          icon: <LuClipboardType size={20} />,
          route: "/v/servicemanagement/opconsultation-vital-entry",
        },
      ];

    case "DOCTOR":
      return [
        {
          linkName: "Consultations",
          name: "Consultations",
          icon: <MdDashboardCustomize size={20} />,
          route: "/v/servicemanagement/dropconsultations",
          submenu: [
            {
              linkName: "AllConsultations",
              name: "OP Consultations",
              icon: <PiUsersThreeFill size={20} />,
              route: "/v/servicemanagement/dropconsultations",
            },
          ],
        },
        {
          linkName: "FavInvestigations",
          name: "Regular Investigations",
          icon: <ImLab size={20} />,
          route: "/v/servicemanagement/favinvestigations",
        },
        {
          linkName: "FavInvestigations",
          name: "Regular Medicine",
          icon: <FaBriefcaseMedical size={20} />,
          route: "/v/servicemanagement/favmedicine",
        },
        {
          linkName: "My Availability",
          name: "My Availability",
          icon: <FaRegCalendarAlt size={20} />,
          route: "/v/doctors/set-availability",
        },
        {
          linkName: "Cancel Request",
          name: "Cancel Request",
          icon: <MdOutlineFreeCancellation size={20} />,
          route: "/v/cancelconsultations/canreqfromfo",
        },
      ];
    case "DISCHARGESUMMARY USER":
      return [
        {
          linkName: "Consultations",
          name: "Consultations",
          icon: <MdDashboardCustomize size={20} />,
          route: "/v/servicemanagement/dropconsultations",
          submenu: [
            {
              linkName: "AllConsultations",
              name: "OP Consultations",
              icon: <PiUsersThreeFill size={20} />,
              route: "/v/servicemanagement/dropconsultations",
            },
          ],
        },
        {
          linkName: "FavInvestigations",
          name: "Regular Investigations",
          icon: <ImLab size={20} />,
          route: "/v/servicemanagement/favinvestigations",
        },
        {
          linkName: "FavInvestigations",
          name: "Regular Medicine",
          icon: <FaBriefcaseMedical size={20} />,
          route: "/v/servicemanagement/favmedicine",
        },
        {
          linkName: "My Availability",
          name: "My Availability",
          icon: <FaRegCalendarAlt size={20} />,
          route: "/v/doctors/set-availability",
        },
        {
          linkName: "Cancel Request",
          name: "Cancel Request",
          icon: <MdOutlineFreeCancellation size={20} />,
          route: "/v/cancelconsultations/canreqfromfo",
        },
      ];
    case "FRONTOFFICE ADMIN":
      return [
        {
          name: "Masters",
          icon: <Icons name={"Masters"} />,
          route: "/v/masters/main-masters",
        },
        {
          linkName: "Consultations",
          name: "Consultations",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "AllConsultations",
              name: "OP Consultations",
              icon: <PiUsersThreeFill size={20} />,
              route: "/v/servicemanagement/all-op-consultation",
            },
            {
              linkName: "OP Billing",
              name: "OP Billing",
              icon: <LuBookCheck size={20} />,
              route: "/v/opbookings/all-op-booking-billings",
            },
            {
              linkName: "Cancel Requests",
              name: "Cancel Request",
              icon: <MdOutlineFreeCancellation size={20} />,
              route: "/v/cancelconsultations/canreqfromfo",
            },
          ],
        },
        {
          linkName: "Coroporate",
          name: "Coroporate",
          icon: <PiBuildingOffice size={20} />,
          submenu: [
            {
              linkName: "Corporate Registrations",
              name: "Corporate Registrations",
              icon: <FiUserPlus size={20} />,
              route: "/v/corporate/corpoprate-registration/all-corporate-registrations",
            },
            {
              linkName: "Referral Letter Entry",
              name: "Referral Letter Entry",
              icon: <PiNote size={20} />,
              route: "/v/corporate/corporate-referral-letter/all-corporate-letters",
            },
            {
              linkName: "Corporate Invoice Generation",
              name: "Corporate Invoice Generation",
              icon: <FaFileInvoice size={20} />,
              route: "/v/corporate/corporate-invoice",
            },
          ],
        },
        {
          name: "OP Management",
          icon: <Icons name={"consultation"} />,
          route: "/v/servicemanagement/opmanagement",
        },

        {
          linkName: "Print Prescription",
          name: "Print Prescription",
          icon: <PiUsersThreeFill size={20} />,
          route: "/v/servicemanagement/prescription-print",
        },
      ];
    case "MATERIAL":
      return [
        {
          linkName: "vitalsentry",
          name: "Vitals Entry",
          icon: <LuClipboardType size={20} />,
          route: "/v/servicemanagement/opconsultation-vital-entry",
        },
      ];

    case "LAB_CONSULTANT":
      return [
        {
          linkName: "AllConsultations",
          name: "Lab Consultations",
          icon: <ImLab size={20} />,
          route: "/v/lab/lab-consultations/all-labconsultations",
        },
        {
          name: "Masters",
          icon: <Icons name={"Masters"} />,
          route: "/v/masters/main-masters",
        },
      ];
    case "SUPERUSER":
      return [
        {
          name: "Dashboard",
          icon: <Icons name={"Masters"} />,
          route: "/v/dashboard",
        },
        {
          name: "Masters",
          icon: <Icons name={"Masters"} />,
          route: "/v/masters/main-masters",
        },
        {
          linkName: "Consultations",
          name: "Consultations",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "AllConsultations",
              name: "OP Consultations",
              icon: <PiUsersThreeFill size={20} />,
              route: "/v/servicemanagement/all-op-consultation",
            },
            {
              linkName: "OP Billing",
              name: "OP Billing",
              icon: <LuBookCheck size={20} />,
              route: "/v/opbookings/all-op-booking-billings",
            },
            {
              linkName: "Cancel Requests",
              name: "Cancel Request",
              icon: <MdOutlineFreeCancellation size={20} />,
              route: "/v/cancelconsultations/canreqfromfo",
            },
          ],
        },
        {
          linkName: "Coroporate",
          name: "Coroporate",
          icon: <PiBuildingOffice size={20} />,
          submenu: [
            {
              linkName: "Corporate Registrations",
              name: "Corporate Registrations",
              icon: <FiUserPlus size={20} />,
              route: "/v/corporate/corpoprate-registration/all-corporate-registrations",
            },
            {
              linkName: "Referral Letter Entry",
              name: "Referral Letter Entry",
              icon: <PiNote size={20} />,
              route: "/v/corporate/corporate-referral-letter/all-corporate-letters",
            },
            {
              linkName: "Corporate Invoice Generation",
              name: "Corporate Invoice Generation",
              icon: <FaFileInvoice size={20} />,
              route: "/v/corporate/corporate-invoice",
            },
          ],
        },
        {
          name: "OP Management",
          icon: <Icons name={"consultation"} />,
          route: "/v/servicemanagement/opmanagement",
        },
        {
          linkName: "Reports",
          name: "Reports",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "op-Consultation-reports",
              name: "OP Consultation Reports",
              icon: <BiSolidReport size={20} />,
              route: "/v/reports/op-consultations-reports",
            },
            {
              linkName: "op billing reports",
              name: "OP Billing Reports",
              icon: <LuBookCheck size={20} />,
              route: "/v/reports/op-billing-reports",
            },
            {
              linkName: "all-op-reports",
              name: "OP Reports PDF",
              icon: <BiSolidReport size={20} />,
              route: "/v/reports/all-op-reportspdf",
            },
          ],
        },
        {
          linkName: "Print Prescription",
          name: "Print Prescription",
          icon: <PiUsersThreeFill size={20} />,
          route: "/v/servicemanagement/prescription-print",
        },
      ];
    case "ADMIN":
      return [
        {
          name: "Masters",
          icon: <Icons name={"Masters"} />,
          route: "/v/masters/main-masters",
        },
        {
          linkName: "Consultations",
          name: "Consultations",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "AllConsultations",
              name: "OP Consultations",
              icon: <PiUsersThreeFill size={20} />,
              route: "/v/servicemanagement/all-op-consultation",
            },
            {
              linkName: "OP Billing",
              name: "OP Billing",
              icon: <LuBookCheck size={20} />,
              route: "/v/opbookings/all-op-booking-billings",
            },
            {
              linkName: "Cancel Requests",
              name: "Cancel Request",
              icon: <MdOutlineFreeCancellation size={20} />,
              route: "/v/cancelconsultations/canreqfromfo",
            },
          ],
        },
        {
          linkName: "Coroporate",
          name: "Coroporate",
          icon: <PiBuildingOffice size={20} />,
          submenu: [
            {
              linkName: "Corporate Registrations",
              name: "Corporate Registrations",
              icon: <FiUserPlus size={20} />,
              route: "/v/corporate/corpoprate-registration/all-corporate-registrations",
            },
            {
              linkName: "Referral Letter Entry",
              name: "Referral Letter Entry",
              icon: <PiNote size={20} />,
              route: "/v/corporate/corporate-referral-letter/all-corporate-letters",
            },
            {
              linkName: "Corporate Invoice Generation",
              name: "Corporate Invoice Generation",
              icon: <FaFileInvoice size={20} />,
              route: "/v/corporate/corporate-invoice",
            },
          ],
        },
        {
          name: "OP Management",
          icon: <Icons name={"consultation"} />,
          route: "/v/servicemanagement/opmanagement",
        },
        {
          linkName: "Reports",
          name: "Reports",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "op-Consultation-reports",
              name: "OP Consultation Reports",
              icon: <BiSolidReport size={20} />,
              route: "/v/reports/op-consultations-reports",
            },
            {
              linkName: "op billing reports",
              name: "OP Billing Reports",
              icon: <LuBookCheck size={20} />,
              route: "/v/reports/op-billing-reports",
            },
            {
              linkName: "all-op-reports",
              name: "OP Reports PDF",
              icon: <BiSolidReport size={20} />,
              route: "/v/reports/all-op-reportspdf",
            },
          ],
        },
        {
          linkName: "Print Prescription",
          name: "Print Prescription",
          icon: <PiUsersThreeFill size={20} />,
          route: "/v/servicemanagement/prescription-print",
        },
      ];

    default:
      return [
         
        {
          name: "Masters",
          icon: <Icons name={"Masters"} />,
          route: "/v/masters/main-masters",
        },
        {
          linkName: "Consultations",
          name: "Consultations",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "AllConsultations",
              name: "OP Consultations",
              icon: <PiUsersThreeFill size={20} />,
              route: "/v/servicemanagement/all-op-consultation",
            },
            {
              linkName: "OP Billing",
              name: "OP Billing",
              icon: <LuBookCheck size={20} />,
              route: "/v/opbookings/all-op-booking-billings",
            },
            {
              linkName: "Cancel Requests",
              name: "Cancel Request",
              icon: <MdOutlineFreeCancellation size={20} />,
              route: "/v/cancelconsultations/canreqfromfo",
            },
          ],
        },
        {
          linkName: "Coroporate",
          name: "Coroporate",
          icon: <PiBuildingOffice size={20} />,
          submenu: [
            {
              linkName: "Corporate Registrations",
              name: "Corporate Registrations",
              icon: <FiUserPlus size={20} />,
              route: "/v/corporate/corpoprate-registration/all-corporate-registrations",
            },
            {
              linkName: "Referral Letter Entry",
              name: "Referral Letter Entry",
              icon: <PiNote size={20} />,
              route: "/v/corporate/corporate-referral-letter/all-corporate-letters",
            },
            {
              linkName: "Corporate Invoice Generation",
              name: "Corporate Invoice Generation",
              icon: <FaFileInvoice size={20} />,
              route: "/v/corporate/corporate-invoice",
            },
          ],
        },
        {
          name: "OP Management",
          icon: <Icons name={"consultation"} />,
          route: "/v/servicemanagement/opmanagement",
        },
        {
          linkName: "Reports",
          name: "Reports",
          icon: <MdDashboardCustomize size={20} />,
          submenu: [
            {
              linkName: "op-Consultation-reports",
              name: "OP Consultation Reports",
              icon: <BiSolidReport size={20} />,
              route: "/v/reports/op-consultations-reports",
            },
            {
              linkName: "op billing reports",
              name: "OP Billing Reports",
              icon: <LuBookCheck size={20} />,
              route: "/v/reports/op-billing-reports",
            },
          ],
        },
        {
          linkName: "Print Prescription",
          name: "Print Prescription",
          icon: <PiUsersThreeFill size={20} />,
          route: "/v/servicemanagement/prescription-print",
        },
      ];
  }
})();
