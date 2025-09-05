
import { returningValue } from "../Utils/Config";
import { CiUnread, CiRead } from "react-icons/ci";

export const InputField = ({
  disabled,
  errors,
  divClass = "col-md-4",
  label,
  className = "",
  dataType = "",
  ...rest
}) => {
  return (
    <div className={`${divClass}  custom-input`}>
      <label>{label}</label>
      <input
        {...rest}
        disabled={disabled}
        value={returningValue(rest?.data?.[rest?.name], dataType)}
        type="text"
        className={`form-control ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      />
    </div>
  );
};

export const ImageField = ({ divClass = "col-md-4", label, src, alt = "Image", className = "", style = {} }) => {
  return (
    <div className={`${divClass} custom-input text-center`}>
      <label className="d-block">{label}</label>
      <img
        src={src}
        alt={alt}
        className={`img-fluid rounded-circle border ${className}`}
        style={{ objectFit: "cover", maxWidth: "80px", maxHeight: "80px", ...style }}
      />
    </div>
  );
};

export const InputPasswordField = ({
  errors,
  divClass = "col-md-4",
  label,
  className = "",
  dataType = "",
  changingPasswordtype,
  password,
  ...rest
}) => {
  return (
    <div className={`${divClass}  custom-input `} style={{ position: "relative" }}>
      <label>{label}</label>
      <input
        {...rest}
        value={returningValue(rest?.data?.[rest?.name], dataType)}
        type={password ? "password" : "text"}
        className={`form-control ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      />
      <a
        className="passwordshowbtn"
        style={{ position: "absolute", top: "8px", right: "15px" }}
        onClick={changingPasswordtype}
      >
        {!password ? <CiUnread size={"20px"} color="black" /> : <CiRead size={"20px"} color="black" />}
      </a>
    </div>
  );
};
// Vinay
export const InputFileField = ({ errors, divClass = "col-md-4", label, className = "", dataType = "", ...rest }) => {
  return (
    <div className={`${divClass}  custom-input`}>
      <label>{label}</label>
      <input
        {...rest}
        // value={returningValue(rest?.data?.[rest?.name], dataType)}
        type="file"
        className={`form-control ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      />
    </div>
  );
};

/*Naveen*/
export const InputTextArea = ({
  errors,
  divClass = "col-md-4",
  dataType = "",
  label,
  className = "",
  rows = 2,
  ...rest
}) => {
  return (
    <div className={`${divClass} custom-input`}>
      <label>{label}</label>
      <textarea
        {...rest}
        value={returningValue(rest?.data?.[rest?.name], dataType)}
        className={`form-control ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
        rows={rows}
      />
    </div>
  );
};

/*Naveen*/
export const InputFieldDate = ({ errors, divClass = "col-md-4", label, className = "", dataType = "", ...rest }) => {
  return (
    <div className={`${divClass} custom-input`}>
      <label htmlFor={rest.name}>{label}</label>
      <input
        id={rest.name}
        {...rest}
        min={rest.min}
        value={returningValue(rest?.data?.[rest?.name], dataType)}
        type="date"
        className={`form-control ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      />
    </div>
  );
};

export const InputFieldTime = ({ errors, divClass = "col-md-4", label, className = "", dataType = "", ...rest }) => {
  return (
    <div className={`${divClass} custom-input`}>
      <label htmlFor={rest.name}>{label}</label>
      <input
        id={rest.name}
        {...rest}
        min={rest.min}
        value={returningValue(rest?.data?.[rest?.name], dataType)}
        type="time"
        className={`form-control ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      />
    </div>
  );
};



export const NormalSelectField = ({
  errors,
  divClass = "col-md-4",
  label,
  className = "",
  dataType = "",
  ...rest
}) => {
  return (
    <div className={`${divClass} custom-input `} style={{ zIndex: 1 }}>
      <label className="">{label}</label>
      <select
        {...rest}
        value={returningValue(rest?.data?.[rest?.name], '')}
        type="select"
        className={`form-select ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      >
        <option value={""}>Select</option>
        {rest?.options?.map((e, i) => (
          <option key={i} value={e?.value}>
            {e?.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export const WithOutSelectOption = ({
  errors,
  divClass = "col-md-4",
  label,
  className = "",
  dataType = "",
  ...rest
}) => {
  return (
    <div className={`${divClass} custom-input `} style={{ zIndex: 1 }}>
      <label className="">{label}</label>
      <select
        {...rest}
        value={returningValue(rest?.data?.[rest?.name], '')}
        type="select"
        className={`form-select ${returningValue(errors?.[rest?.name], "ErrorColor")} ${className || ""}`}
      >
        {/* <option value={""}>Select</option> */}
        {rest?.options?.map((e, i) => (
          <option key={i} value={e?.value}>
            {e?.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export const RadioField = ({ divClass = "col-md-4 d-flex", className = "", label, ...rest }) => {
  return (
    <div className={`${divClass}  ps-2`}>
      <label className=" ">{label}</label>
      <div className="d-flex ">
        {rest?.options?.map((e, i) => (
          <div className={`form-check ${i % 2 != 0 ? "ms-2" : "ms-2"} `} key={i}>
            <input
              {...rest}
              value={e.value}
              type="radio"
              checked={returningValue(rest?.data?.[rest?.name], "") == e.value}
              className={`form-check-input ${className}`}
            />
            <span className="form-check-label" htmlFor={e.value}>
              {e.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CheckBoxField = ({ divClass = "col-md-4", className = "", label, dataType = "", ...rest }) => {
  return (
    <div className={`${divClass} d-flex flex-wrap `}>
      <label className="me-2">{label}</label>
      {rest?.options?.map((e, i) => (
        <div className="form-check ms-2" key={i}>
          <input
            {...rest}
            value={e.value}
            type="checkbox"
            checked={
              dataType == "Array"
                ? returningValue(rest?.data?.[rest?.name], "Array")?.includes(e.value)
                : returningValue(rest?.data?.[rest?.name], "") == e.value
            }
            className={`form-check-input ${className}`}
          />
          <label className="form-check-label" htmlFor={e.value}>
            {e.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export const NormalDate = ({ today, maxDate, handleDatesChange, selectedDate, divClass }) => {
  return (
    <div className={`${divClass} custom-input`}>
      <label className="">Select Date</label>
      <input
        type="date"
        value={selectedDate}
        min={today}
        max={maxDate}
        onChange={handleDatesChange}
        className="form-control"
      />
    </div>
  );
};





const fieldMapping = {
  Input: InputField,
  Password: InputPasswordField,
  Date: InputFieldDate,

  NormalSelect: NormalSelectField,
  Radio: RadioField,
  Checkbox: CheckBoxField,
  Textarea: InputTextArea,
  File: InputFileField,
  Image: ImageField,
  Time: InputFieldTime,
  WithOutSelectOption:WithOutSelectOption
};

export const ReturnInput = ({ type, ...rest }) => {
  let Comp = fieldMapping?.[type];
  return Comp ? <Comp {...rest} /> : type == "Selector" ? rest?.selector : <></>;
};
