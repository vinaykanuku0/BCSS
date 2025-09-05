import React from "react";
const buttonMapping = {
  Save: { className: "btn btn-primary", defaultLabel: "Save" },
  Initiate: { className: "btn btn-primary", defaultLabel: "Initiate" },
  Submit: { className: "btn btn-primary", defaultLabel: "Submit" },
  cancel: { className: "btn btn-secondary", defaultLabel: "Cancel" },
  delete: { className: "btn btn-danger", defaultLabel: "Delete" },
  submit: { className: "btn btn-success", defaultLabel: "Submit" },
  Upload: { className: "btn btn-primary", defaultLabel: "Upload" },
  Remove: { className: "btn btn-danger", defaultLabel: "Remove" },
  Register: { className: "btn btn-primary", defaultLabel: "Register" },
  Reject: { className: "btn btn-outline-danger", defaultLabel: "Reject" },
  Approve: { className: "btn btn-outline-success", defaultLabel: "Approve" }
};


const Button = ({ type = "Save", label, className = "", ...rest }) => {
  const buttonConfig = buttonMapping?.[type || label] || buttonMapping?.Save;
  return (
    <button className={`${buttonConfig.className} ${className}`}{...rest}>
      {label || buttonConfig?.defaultLabel}
    </button>
  );
};
export default Button;