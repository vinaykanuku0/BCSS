import moment from "moment/moment";
import CryptoJS from "crypto-js";
import * as XLSX from "xlsx";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import instance from "../Services";
import Swal from "sweetalert2";

export const apiUrl = "https://localhost:7240/api/";
export const basefileURL = import.meta.env.VITE_API_FILE_URL;
export const googleTranslaterApi = "https://baithna.tribandtech.com:2011/Translation_Te-eng";
export const soapNoteApi = "https://baithna.tribandtech.com:4321/api/summarize";
export const encryptKey = "1M3D^ERZ@B@!TN@1";
export const ivKey = "1B@!TN@@M3D^ERZ1";
export const urls = {
  Student: {
    Login: "Student/Login",
  },
  ClassRoom: {
    getAll: "ClassRoom/GetAllClass",
    save: "ClassRoom/SaveClass",
  },
  Auth: {
    Login: "Authentication/Login",
  },
  Hospital: {
    save: "Hospital/SaveHospital",
    getAll: "Hospital/GetAllHospitals",
    getAllLabels: "Hospital/GetAllHospitalsLabel",
    uploadLogo: "Hospital/SaveHospitalLogo",
  },
  Employee: {
    GenerateEmployeeId: "Employee/GenerateEmployeeId",
    SaveEmployeeBasicDetails: "Employee/SaveEmployeeBasicDetails",
    UploadEmpProfile: "Employee/SaveProfilePhoto",
    getAll: "Employee/GetAllEmployee",
    updateStatus: "Employee/StatusUpdate",
    EmployeeGetById: "Employee/EmployeeGetById",
    SaveEmployeeAddress: "Employee/SaveEmployeeAddress",
    SaveEmployeeEducation: "Employee/SaveEmployeeEducation",
    SaveEmployeeExperience: "Employee/SaveEmployeeExperience",
    SaveDocuments: "Employee/SaveDocuments",
    GetEmployeeDocuments: "Employee/GetEmpDocuments",
    GetEmployeeAaddressById: "Employee/AddressGetById",
    DeleteEmployeeDocuments: "Employee/DeleteEmpDoc",
    getAllEmployeeAddress: "Employee/GetAllAddress",
    GetAllExperience: "Employee/GetAllExperience",
    GetAllEducation: "Employee/GetAllEducation",
    UpdateMedicalCheckUpStatus: "Employee/UpdateMedicalCheckUpStatus",
    GetAllEmployeeLabel: "Employee/GetAllEmployeeLabel",
  },

  Masters: {
    SaveDesignation: "Designation/SaveDesignation",
    SaveServiceGroup: "ServiceGroup/SaveServiceGroup",
    GetAllServiceGroup: "ServiceGroup/GetAllServiceGroup",
    GetAllServiceGroupLabel: "ServiceGroup/GetAllServiceGroupLabel",
    SaveService: "Service/SaveService",
    GetAllServices: "Service/GetAllServices",
    GetAllServicesLabel: "Service/GetAllServicesLabel",
    SaveBillingHeader: "BillingHeader/SaveBillingHeader",
    GetAllBillingHeaderLabel: "BillingHeader/GetAllBillingHeaderLabel",
    GetAllBillingHeader: "BillingHeader/GetAllBillingHeader",
    SaveTitle: "Designation/SaveTitle",
    GetAllTitleLabel: "Designation/GetAllTitle",
    GetAllTitles: "Designation/GetAllTitles",
    GetAllDesignations: "Designation/GetAllDesignations",
    GetAllDepartments: "Department/GetAllDepartments",
    GetAllDepartmentsLabel: "Department/GetAllDepartmentsLabel",
    SaveDepartment: "Department/SaveDepartment",
    GetAllDepartments: "Department/GetAllDepartments",
    GetAllDesignationsLabel: "Designation/GetAllDesignationsLabel",
    SaveDoctor: "Doctor/SaveDoctor",
    SaveSpecialization: "Specialization/SaveSpecialization",
    GetAllSpecializations: "Specialization/GetAllSpecializations",
    SaveSpecialization: "Specialization/SaveSpecialization",
    GetAllSpecializations: "Specialization/GetAllSpecializations",
    GetAllSpecializationsLabel: "Specialization/GetAllSpecializationsLabel",
    SaveDoctorAddress: "Doctor/SaveDoctorAddress",
    SaveDoctorPersonalDetails: "Doctor/SaveDoctorDetails",
    SaveDoctorEducation: "Doctor/SaveDoctorEducation",
    SaveDoctorExperiance: "Doctor/SaveDoctorExperience",
    GetAllDoctorExperience: "Doctor/GetAllDoctorExperience",
    SaveDoctorProfile: "Doctor/SaveDoctorProfile",
    RemoveExperienceDetails: "Doctor/RemoveExperienceDetails",
    DoctorGetById: "Doctor/DoctorGetById",
    GetAllDoctors: "Doctor/GetAllDoctors",
    DoctorPersonalGetById: "Doctor/DoctorPersonalGetById",
    GetAllDoctorEducation: "Doctor/GetAllDoctorEducation",
    SaveOccupation: "Occupation/SaveOccupation",
    GetAllOccupation: "Occupation/GetAllOccupation",
    GetAllOccupationLabel: "Occupation/GetAllOccupationLabel",
    SaveDoctorCharges: "DoctorCharges/SaveDoctorCharges",
    GetDoctorCharges: "DoctorCharges/GetDoctorCharges",
    SaveTariff: "Tariff/SaveTariff",
    GetAllTariff: "Tariff/GetAllTariff",
    GetAlltariffLabel: "Tariff/GetAlltariffLabel",
    SaveTariffService: "TariffService/SaveService",
    GetAllTariffServices: "TariffService/GetAllTariffServices",
    GetAllTariffServicesLabel: "TariffService/GetAllTariffServicesLabel",
    GetAllDoctorLabel: "Doctor/GetAllDoctorLabel",
    GetAllCategory: "Category/GetAllCategory",
    SaveCategory: "Category/SaveCategory",
    GetAllCategoryLabel: "Category/GetAllCategoryLabel",
    SaveReferral: "Referral/SaveReferral",
    GetAllReferral: "Referral/GetAllReferrals",
    SaveReferralPercentage: "Referral/SaveReferralPercentage",
    GetReferralPercentage: "Referral/GetReferralPercentage",
    GetAllReferralLabel: "Referral/GetAllReferralLabel",
    SaveOrganization: "Organization/SaveOrganization",
    GetAllOrganization: "Organization/GetAllOrganization",
    GetAllOrganizationLabel: "Organization/GetAllOrganizationLabel",
    SaveCharges: "Organization/SaveCharges",
    UpdateDoctorCharge: "Organization/UpdateDoctorCharge",
    GetCharges: "Organization/GetCharges",
    GetPincodeData: "Pincode/GetPincodeData",
    GetConsultationFee: "DoctorCharges/GetConsultationFee",
    RemoveEducationDetails: "Doctor/RemoveEducationDetails",
    GetAllBankMasterLabel: "BankMaster/GetAllBankMasterLabel",
    SaveSpecimen: "Specimen/SaveSpecimen",
    GetAllSpecimenLabel: "Specimen/GetAllSpecimenLabel",
    GetAllSpecimen: "Specimen/GetAllSpecimen",
    SaveUserGroup: "UserGroup/SaveUserGroup",
    GetAllUserGroup: "UserGroup/GetAllUserGroup",
    GetAllUserGroupLabel: "UserGroup/GetAllUserGroupLabel",
  },

  report: {
    GenerateOpConsBillingReport: "Report/GenerateOpConsBillingReport",
    OpBillingReport: "Report/OpBillingReport",
  },

  Patient: {
    SavePatientBasicDetails: "Patient/SavePatientBasicDetails",
    GetAllPatient: "Patient/GetAllPatient",
    PatientGetById: "Patient/PatientGetById",
    PatientUMRGetByNumber: "Patient/PatientUMRGetByNumber",
    GetUMRNumber: "Patient/GetUMRNumber",
    GetAllReligionLabel: "Patient/GetAllReligionLabel",
    SavePatientAddress: "Patient/SavePatientAddress",
    GetRecNumber: "Patient/GetRecNumber ",
    GetPatientUmrNumbersList: "Patient/GetPatientUmrNumbersList",
  },
  Consultation: {
    SaveOpConsultation: "OpConsultation/SaveOpConsultation",
    GetAllOpConsultations: "OpConsultation/GetAllOpConsultations",
    GetOpConsultationById: "OpConsultation/GetOpConsultationById",
    UploadLetterFile: "OpConsultation/UploadLetterFile",
    CancelRequest: "OpConsultation/CancelRequest",
    DoctorApproval: "OpConsultation/DoctorApproval",
    AuditorApproval: "OpConsultation/AuditorApproval",
  },
  Doctor: {
    GetOpConsultationByDoctorId: "Doctor/GetOpConsultationByDoctorId",
    SavePrescription: "DoctorPrescription/SavePrescription",
    GetDoctorPrescription: "DoctorPrescription/GetDoctorPrescription",
    ScheduleAvailability: "Doctor/ScheduleAvailability",
    GetAvailability: "Doctor/GetAvailability",
    GetPatientEHR: "DoctorPrescription/GetPatientEHR",
    GetDoctors: "Organization/GetDoctors",
    GetOpConsultationByNurseId: "Doctor/GetOpConsultationByNurseId",
    PrescriptionStatus: "DoctorPrescription/PrescriptionStatus",
  },
  OPBilling: {
    GetServices: "OPBilling/GetServices",
    Organization: "Organization/GetPatientList",
    GetServiceCharge: "OPBilling/GetServiceCharge",
    GetAllPatientList: "OPBilling/GetAllPatientList",
    SaveOpBilling: "OPBilling/SaveOpBilling",
    SaveOpBillingReceipt: "OpBilling/SaveOpBillingReceipt",
    GetOSPandBillNumber: "OPBilling/GetOSPandBillNumber",
    GetOpBilling: "OPBilling/GetOpBilling",
    GetBillingDetailsByRefNo: "OPBilling/GetBillingDetailsByRefNo",
    GetInvestigations: "OPBilling/GetInvestigations",
  },
  Corporate: {
    CorporateRegistration: "CorporateRegistration/SaveCorporateRegistration",
    GetAllCorporatePatients: "CorporateRegistration/GetAllCorporatePatients",
    SaveCoLetterDetails: "CorporateRegistration/SaveCoLetterDetails",
    GetCorporatePatientsData: "CorporateRegistration/GetCorporatePatientsData",
    GetLetterDetails: "CorporateRegistration/GetLetterDetails",
  },
  Service: {
    UpdateIsFavorite: "Service/UpdateIsFavorite",
    GetAllFavInvestigations: "Service/GetAllFavInvestigations",
    GetAllInvestigations: "Service/GetAllInvestigations",
  },
  Report: {
    GenerateOpConsultationReceipt: "Report/GenerateOpConsultationReceipt",
    GeneratePrescription: "Report/GeneratePrescription",
  },
  Pharma: {
    GetAllMedicines: "Item/GetAllMedicines",
    UpdateIsFavorite: "Item/UpdateIsFavorite",
    GetAllFavMedicines: "Item/GetAllFavMedicines",
    GetAllMedicineList: "Item/GetAllMedicineList",
  },

  Address: {
    GetAllCountry: "Address/GetAllCountry",
    GetCountryLabel: "Address/GetCountryLabel",
  },
  UserDocument: {
    SaveUserDocuments: "UserDocument/SaveUserDocuments",
    GetAllDocuments: "UserDocument/GetAllDocuments",
  },
};

export const ListType = {
  hospital: "hospital",
  EmployeeEducation: "EmployeeEducation",
};

export const validateFileType = (file, validImageTypes) => {
  const fileType = file["type"];
  return validImageTypes.includes(fileType);
};

export const dilogueBox = (text, onClickFn) => {
  Swal.fire({
    title: text,
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      onClickFn();
    }
  });
};

export const notify = (status, msg) => {
  const toastOptions = {
    position: "bottom-left", // Set the position to bottom-right
    autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
    hideProgressBar: false, // Show the progress bar
    closeOnClick: true, // Close the toast when clicked
    pauseOnHover: true, // Pause the timer when hovering
    draggable: true, // Make the toast draggable
    progress: undefined, // Use the default progress bar
    // transition: Flip,
    theme: "dark",
    transition: Zoom,
    style: {
      width: "300px", // Adjust width as needed
    },
  };
  if (status == true) {
    toast.success(msg, toastOptions);
    // return (<ToastContainer />)
  } else {
    toast.error(msg, toastOptions);
    // return (<ToastContainer />)
  }
};

export const getList = async (url, data) => {
  try {
    let res = await instance.post(url, data);
    return res?.data?.status == true && Array.isArray(res?.data?.data) && res?.data?.data?.length > 0 ? res.data.data : [];
  } catch (e) {
    return [];
  }
};

export const getPList = async (url, data) => {
  try {
    let res = await instance.post(url, data);
    return res?.data?.status == true && Array.isArray(res?.data?.data) && res?.data?.data?.length > 0 ? { data: res.data.data, totalCount: res?.data?.totalCount } : { data: [], totalCount: 0 };
  } catch (e) {
    return [];
  }
};

export const getById = async (url, data) => {
  try {
    let res = await instance.post(url, data);
    return res?.data?.status == true && Object.keys(res?.data?.data)?.length > 0 ? res?.data?.data : {};
  } catch (e) {
    return {};
  }
};

export const getByText = async (url, data) => {
  try {
    const res = await instance.post(url, data);
    return Object.keys(res)?.length > 0 ? res?.data : {};
  } catch (e) {
    return {};
  }
};

export const save = async (url, data) => {
  console.log(url, "data");
  try {
    let res = await instance?.post(url, data);
    notify(res?.data?.status, res?.data?.message);
    return res?.data?.status == true ? res : {};
  } catch (e) {
    return {};
  }
};
export const saveWithoutMessage = async (url, data) => {
  try {
    let res = await instance.post(url, data);
    if (res?.data?.status != true) notify(res?.data?.status, res?.data?.message);
    return res?.data?.status == true ? res : {};
  } catch (e) {
    return {};
  }
};

export const navigationFns = (user) => {
  let roleId = user?.roleId;
  let status = user?.status;
  let groupId = user?.groupId;
  // let link = sidenavbars?.find(v => (v?.linkName == links?.[0]))
  // let navigate = link?.child ? link?.child?.[0]?.route : link?.route

  // let route = [1, 2, 3, 5]?.some((e) => e == groupId) ? `${navigate ? "/v1/service/admindashboard" : "accessLinksNotAssigned"}`
  //   : [4, 6]?.some((e) => e == groupId) ? `${navigate ? "/v1/service/appointment/scheduled-appointments" : "accessLinksNotAssigned"}`
  //     : roleId == 5 ? `${navigate ? "/v1/service/appointment/pending-appointments" : "accessLinksNotAssigned"}` : ""
  let route = roleId == 3 ? (status != "Pending" ? "/v/masters/main-masters" : "/update-employee-details") : roleId == 4 ? "/v/servicemanagement/dropconsultations" : roleId == 10 ? "/v/lab/lab-consultations/all-labconsultations" : roleId == 11 ? "/v/lab/samplecollection" : "/v/masters/main-masters";

  return route;
};
export const navigationFn = (user) => {
  const roleId = Number(user?.roleId);
  const status = user?.status;
  const profileName = user?.profileName;

  console.log("Role ID:", roleId, "Profile Name:", profileName);

  let route = "";

  if (roleId === 3) {
    route = status !== "Pending" ? "/v/masters/main-masters" : "/update-employee-details";
  } else if (roleId === 4 || profileName === "DOCTORS" || profileName === "DISCHARGESUMMARY USER") {
    route = "/v/servicemanagement/dropconsultations";
  } else if (roleId === 10) {
    route = "/v/lab/lab-consultations/all-labconsultations";
  } else if (roleId === 11) {
    route = "/v/lab/samplecollection";
  } else if (profileName === "FRONTOFFICE ADMIN") {
    route = "/v/masters/main-masters";
  } else if (profileName === "MATERIAL REQUSET" || profileName === "NS-USER" || profileName === "NS-ADMIN") {
    route = "/v/servicemanagement/opconsultation-vital-entry";
  } else if (roleId === 1) {
    route = "/v/dashboard"; // SUPERUSER
  } else if (roleId !== 1 && profileName === "SUPER USER") {
    route = "/v/masters/main-masters"; // ADMIN with SUPER USER title but not roleId 1
  } else {
    route = "/v/masters/main-masters"; // default fallback
  }

  return route;
};

export const logOutFunction = () => (sessionStorage.clear(), (window.location.pathname = "/"));
export const getUserfromSS = () => JSON.parse?.(dec(sessionStorage?.getItem("user")) || "{}");
// console.log(getUserfromSS(),"getUserfromSS")
export const getUniqueByKey = (array, key) => [...new Map(array.map((item) => [key ? item[key] : item, item])).values()] || [];
export const settingdata = (data, keys) => keys.reduce((temp, key) => Object.assign(temp, { [key]: data[key] || "" }), {});
export const resettingdata = (keys) => keys.reduce((temp, key) => Object.assign(temp, { [key]: "" }), {});
export const sortingList = (array, key, type) => array?.sort((a, b) => (type == "Number" ? a?.[key] - b?.[key] : type == "Date" ? new Date(a?.[key]) - new Date(b?.[key]) : a?.[key]?.localeCompare(b?.[key])));
export const stringToInt = (data, keys) => keys.reduce((temp, key) => Object.assign(temp, { [key]: returningValue(data[key]) == "" ? 0 : parseInt(data[key], 10) }), data);
export const stringToArray = (str, dataArray, idKey) => (str?.length > 0 && str?.split(",")?.map((e) => ({ ...dataArray?.find((v) => v?.[idKey] == e) }))) || [];

export const removeDuplicates = (array, key) => {
  const uniqueKeys = new Set();
  return array.filter((e) => (!uniqueKeys.has(e?.[key]) ? (uniqueKeys.add(e?.[key]), true) : false));
};
export const enc = (data) => {
  if (returningValue(data, "") != "") {
    const key = CryptoJS.enc.Utf8.parse(encryptKey);
    const iv = CryptoJS.enc.Utf8.parse(ivKey);
    const encrypteddata = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const encrypted = encrypteddata.toString();
    return encrypted;
  } else {
    return null;
  }
};

export const dec = (data) => {
  if (returningValue(data, "") != "") {
    const key = CryptoJS.enc.Utf8.parse(encryptKey);
    const iv = CryptoJS.enc.Utf8.parse(ivKey);
    const decryptedBytes = CryptoJS.AES.decrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decrypted || "";
  }
};

export const encryptData = (data) => {
  let en = CryptoJS.AES.encrypt(data?.toString(), "AROHS")?.toString();
  let encoded = CryptoJS.enc.Base64.parse(en).toString(CryptoJS.enc.Hex);
  return encoded;
};

export const decryptData = (encoded) => {
  let temp = {};
  Object.entries(encoded)?.map(([key, value], i) => {
    if (i > 0) {
      let decoded1 = CryptoJS.enc.Hex.parse(value).toString(CryptoJS.enc.Base64);
      let decrypted1 = CryptoJS.AES.decrypt(decoded1, "AROHS")?.toString(CryptoJS.enc.Utf8);
      temp[key] = decrypted1;
    }
  });
  return temp;
};

export const returningValue = (v, type) => {
  const isValid = v !== undefined && v !== null && v !== "" && v !== NaN && v !== "null";
  if (isValid) {
    switch (type) {
      case "Alphabet":
        var va = v
          ?.replace(/[^a-zA-Z ]/g, "")
          ?.replace(/^\s+/, "")
          ?.replace(/\s+/g, " ");
        va = va?.charAt(0).toUpperCase() + v.slice(1);
        return va;
      case "AlphaNumaric":
        var va = v
          ?.replace(/[^a-zA-Z0-9 ]/g, "")
          ?.replace(/^\s+/, "")
          ?.replace(/\s+/g, " ");
        va = va?.charAt(0)?.toUpperCase() + v?.slice(1);
        return va;
      case "Phone":
        let n = v
          ?.replace("+91", "")
          ?.replace(/[^0-9]/g, "")
          ?.replace(/\s+/g, "");
        let l = n?.length;
        if (l > 0 && l <= 5) return n?.replace(/(\d{1,5})/, "+91 $1");
        else if (l > 5 && l <= 10) return n?.replace(/(\d{5})(\d{1,5})/, "+91 $1 $2");
        break;
      case "Date":
        return new Date(v) !== "Invalid Date" ? new Date(v) : "";
      case "Dates":
        return moment(v).format("YYYY-MM-DD") != "Invalid Date" ? moment(v).format("YYYY-MM-DD") : "";
      case "Email":
        return v?.toLowerCase()?.replace(/\s+/g, "");
      case "Number":
        return typeof v == "string" ? v?.replace(/[^0-9 ]/g, "") : v;
      case "Decimal":
        return parseFloat(v).toFixed(2);
      case "DateTime":
        return v === "Invalid date" ? "-" : v;
      case "LocalTime":
        return moment.utc(v, "YYYY-MM-DDTHH:mm:ss").local().format("DD-MM-YYYY H:mm");
      case "Date&Time":
        return moment(v, "YYYY-MM-DD hh:mm:A").format("YYYY-MM-DD");
      case "NumberString":
        return v?.replace(/[^0-9]/g, "");
      case "WithoutSpaces":
        return v?.toString();
      case "DateTimeWithIndianTZ":
        return moment.utc(v).utcOffset("+05:30").format("DD-MM-YYYY HH:mm");

      // ✅ NEW CASE TO REMOVE "^"
      case "Remove^":
      case "RemoveCarets":
        return v?.replace(/\^/g, "");

      case "ErrorColor":
        return "border border-danger rounded";

      default:
        return v;
    }
  } else {
    switch (type) {
      case "Array":
        return [];
      case "Bool":
        return false;
      default:
        return "";
    }
  }
};

export const exportExcel = (data, name, title) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  // const title = "Op Billing Report - List of OP Bills";
  const dateRange = data.shift(); // Removes and stores the date row
  const totalCols = data[0].length;

  // Add Title and Date Rows
  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });
  XLSX.utils.sheet_add_aoa(ws, [[dateRange]], { origin: "A2" });

  // Merge Cells for Title and Date
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: totalCols - 1 } }, // Title row
    { s: { r: 1, c: 0 }, e: { r: 1, c: totalCols - 1 } }, // Date row
  ];

  // Style for Title (Red, Bold, Center)
  ws["A1"].s = {
    font: { bold: true, color: { rgb: "FF0000" }, sz: 14 },
    alignment: { horizontal: "center", vertical: "center" },
  };

  // Style for Date (Magenta, Bold, Center)
  ws["A2"].s = {
    font: { bold: true, color: { rgb: "FF00FF" }, sz: 12 },
    alignment: { horizontal: "center", vertical: "center" },
  };

  // Add Table Data starting from A3
  XLSX.utils.sheet_add_aoa(ws, data, { origin: "A3" });

  // Column Widths
  const columnWidths = data.reduce((acc, row) => {
    row.forEach((cell, i) => {
      acc[i] = Math.max(acc[i] || 0, String(cell).length + 2);
    });
    return acc;
  }, []);
  ws["!cols"] = columnWidths.map((w) => ({ width: w }));

  // Apply styles to table header (Row 3 = r:2)
  data[0].forEach((_, colIndex) => {
    const cell_ref = XLSX.utils.encode_cell({ c: colIndex, r: 2 });
    if (ws[cell_ref]) {
      ws[cell_ref].s = {
        font: { bold: true, color: { rgb: "0000FF" } }, // Blue color
        alignment: { horizontal: "center", vertical: "center" },
      };
    }
  });

  // Optional: Apply left alignment for data rows
  for (let r = 3; r < data.length + 3; r++) {
    for (let c = 0; c < totalCols; c++) {
      const cellRef = XLSX.utils.encode_cell({ c, r });
      if (ws[cellRef]) {
        ws[cellRef].s = {
          alignment: { horizontal: "left", vertical: "center" },
        };
      }
    }
  }

  // Write the file
  XLSX.utils.book_append_sheet(wb, ws, name);
  XLSX.writeFile(wb, `${name}.xlsx`);
};

export const login = {
  userName: { required: { value: true, message: "please Enter User Id" } },
  password: { required: { value: true, message: "please Enter password" } },
};
export const cancelConsulation = {
  remark: { required: { value: true, message: "please Enter User Id" } },
  // approvedBy: { required: { value: true, message: "please Enter password" } },
};
export const addTitle = {
  title: { required: { value: true, message: "please Enter Title" } },
};
export const addDesignation = {
  designationName: { required: { value: true, message: "please Enter Designation" } },
};
export const addSpecialization = {
  specializationName: { required: { value: true, message: "please Enter Specialization" } },
};

export const addBillingHeader = {
  billingHeaderName: { required: { value: true, message: "please Enter Billing Header" } },
  serviceType: { required: { value: true, message: "please Enter Billing Header Code" } },
};
export const chargeEntry = {
  doctorIds: { required: { value: true, message: "please Enter User Id" } },
  opCharge: { required: { value: true, message: "please Enter password" } },
  ipCharge: { required: { value: true, message: "please Enter password" } },
};
export const addHospital = {
  hospitalName: { required: { value: true, message: "please Enter User Id" } },
  code: { required: { value: true, message: "please Enter password" } },
  contact: { required: { value: true, message: "please Enter password" } },
  address: { required: { value: true, message: "please Enter password" } },
  regFee: { required: { value: true, message: "please Enter password" } },
  visits: { required: { value: true, message: "please Enter password" } },
  days: { required: { value: true, message: "please Enter password" } },
};
export const addHospitalAdmin = {
  employeePrefixType: { required: { value: true, message: "please Enter User Id" } },
  employeeName: { required: { value: true, message: "please Enter password" } },
  contact: { required: { value: true, message: "please Enter password" } },
  role: { required: { value: true, message: "please Enter password" } },
  email: { required: { value: true, message: "please Enter password" } },
};

export const addDesignations = {
  designationName: { required: { value: true, message: "please Enter Designation" } },
};

export const addExperienceDetails = {
  hospitalName: { required: { value: true, message: "please Enter Hospital Name" } },
  jobTitle: { required: { value: true, message: "please Enter Job Title" } },
};

export const addEducationDetails = {
  institution: { required: { value: true, message: "please Enter Institution" } },
  university: { required: { value: true, message: "please Enter University" } },
};
export const patientDetailsValidation = {
  patientType: { required: { value: true, message: "please Enter Institution" } },
  umrNumber: { required: { value: true, message: "please Enter Institution" } },
  titleId: { required: { value: true, message: "please Enter Institution" } },
  patientName: { required: { value: true, message: "please Enter Institution" } },
  age: { required: { value: true, message: "please Enter Institution" } },

  gender: { required: { value: true, message: "please Enter Institution" } },
  contactNo: { required: { value: true, message: "please Enter Institution" } },
  nationality: { required: { value: true, message: "please Enter Institution" } },
  refferal: { required: { value: true, message: "please Enter Institution" } },
  receiptNumber: { required: { value: true, message: "please Enter Institution" } },
  paymentType: { required: { value: true, message: "please Enter Institution" } },
  pinCode: { required: { value: true, message: "please Enter Institution" } },
  doctorId: { required: { value: true, message: "please Enter Institution" } },
};
export const addOrganization = {
  organizationName: { required: { value: true, message: "please Enter Organization Name" } },
  contactNo: { required: { value: true, message: "please Enter Organization Code" } },
  contactDate: { required: { value: true, message: "please Enter Contact Date" } },
  contactPerson: { required: { value: true, message: "please Enter Contact Person" } },
  authorizedPerson: { required: { value: true, message: "please Enter Authorized Person" } },
  effectFrom: { required: { value: true, message: "please Enter Effect From" } },
  effectTo: { required: { value: true, message: "please Enter Effect To" } },
  opOrgPercentage: { required: { value: true, message: "please Enter Effect To" } },
};
export const opConsultations = {
  visitType: { required: { value: true, message: "please Enter Organization Name" } },
  doctorId: { required: { value: true, message: "please Enter Organization Code" } },
  consultationDate: { required: { value: true, message: "please Enter Contact Date" } },
  receiptNumber: { required: { value: true, message: "please Enter Effect To" } },
  // receiptDate: { required: { value: true, message: "please Enter Effect To" } },
  // paymentType: { required: { value: true, message: "please Enter Effect To" } },
  patientId: { required: { value: true, message: "please Enter Effect To" } },
  consReferral: { required: { value: true, message: "please Enter Effect To" } },
};
export const corporateReg = {
  patientId: { required: { value: true, message: "please Enter Organization Name" } },
  organizationId: { required: { value: true, message: "please Enter Contact Date" } },
  medicalCardNo: { required: { value: true, message: "please Enter Effect To" } },
  cardValidUpto: { required: { value: true, message: "please Enter Effect To" } },
  empNo: { required: { value: true, message: "please Enter Effect To" } },
};
export const corporateLetter = {
  patientId: { required: { value: true, message: "please Enter Organization Name" } },
  organizationId: { required: { value: true, message: "please Enter Contact Date" } },
  medicalCardNo: { required: { value: true, message: "please Enter Effect To" } },
  cardValidUpto: { required: { value: true, message: "please Enter Effect To" } },
  empNo: { required: { value: true, message: "please Enter Effect To" } },
};
export const addOccupation = {
  occupationName: { required: { value: true, message: "please Enter Occupation Name" } },
};
export const addTarrif = {
  tariffName: { required: { value: true, message: "please Enter Tariff Name" } },
  contactPerson: { required: { value: true, message: "please Enter Contact Person" } },
  effectFromDate: { required: { value: true, message: "please Enter Effect From Date" } },
  effectToDate: { required: { value: true, message: "please Enter Effect To Date" } },
};
