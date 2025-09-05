import { useState } from "react";
let isSubmitted = false;
let newErrors = {};
let hasErrors = false;
export const useFormValidation = (metadata) => {
  const [data, setData] = useState(metadata.initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (key) => (d) => updateErrorsandData(key, d);
  const addObject = (u) => setData((p) => ({ ...p, ...u }));
  const resetData = () => setData({});
  const resetFormData = (key) => updateErrorsandData(key, [{}]);

  // const updateErrorsandData = (key, value) => {
  //   let ld = { ...data, [key]: value };
  //   setData((p) => ({ ...p, [key]: value }));
  //   submittingData(key, value, ld);
  // };
  const updateErrorsandData = (key, value) => {
    const keys = key.split(".");
    const ld = JSON.parse(JSON.stringify(data)); // deep copy to avoid mutation

    let nested = ld;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!nested[keys[i]]) nested[keys[i]] = {};
      nested = nested[keys[i]];
    }
    nested[keys[keys.length - 1]] = value;

    setData(ld);
    submittingData(key, value, ld);
  };

  const returningData = (value, type) => {
    if (value != undefined && value != null && value != "") {
      switch (type) {
        case "Alphabet":
          var v = value
            ?.replace(/[^a-zA-Z ]/g, "")
            ?.replace(/^\s+/, "")
            ?.replace(/\s+/g, " ");
          v = v?.charAt(0).toUpperCase() + v.slice(1);
          return v;
        case "AlphaNumaric":
          var v = value
            ?.replace(/[^a-zA-Z0-9 ]/g, "")
            ?.replace(/^\s+/, "")
            ?.replace(/\s+/g, " ");
          v = v?.charAt(0).toUpperCase() + v.slice(1);
          return v;
        case "AlphabetsWithSpecial":
          var v = value
            ?.replace(/[^a-zA-Z\s!@#$%^&*(),.?":{}|<>]/g, "")
            ?.replace(/^\s+/, "")
            ?.replace(/\s+/g, " ");
          v = v?.charAt(0).toUpperCase() + v.slice(1);
          return v;
        case "CapsAndNextLine":
          let formatted = value
            // Capitalize after ^, ., or start of line
            ?.replace(/(^[a-z])|(\.\s*[a-z])|(\^[a-z])/g, (match) => match.toUpperCase())
            // Ensure space after .
            ?.replace(/\.([^\s])/g, ". $1");
          return formatted;
        case "Number":
          return value?.replace(/[^0-9\.]/g, "");
        case "Charge":
          return value?.replace(/^-?\d*\.?\d*$/g, "");
        case "NumberString":
          return value?.replace(/[^0-9]/g, "");
        case "Phone":
          let res = value
            ?.replace("+91", "")
            ?.replace(/[^0-9]/g, "")
            ?.replace(/\s+/g, "");
          let l = res?.length;
          let r;
          if (l > 0 && l <= 5) {
            r = res?.toString()?.replace(/(\d{1,5})/, "+91 $1");
          } else if (l > 5 && l <= 10) {
            r = res?.toString()?.replace(/(\d{5})(\d{1,5})/, "+91 $1 $2");
          } else {
            r = "";
          }
          return r;
        case "Email":
          return value?.toLowerCase()?.replace(/\s+/g, "");
        case "NoSpace":
          var v = value?.replace(/^\s+/, "")?.replace(/\s+/g, " ");
          return v;
        case "Date":
          let date = "";
          if (value != null) {
            value?.setMinutes(0);
            value?.setHours(0);
            date = new Date(value?.setMinutes(value?.getTimezoneOffset() < 0 ? -value?.getTimezoneOffset() : value?.getTimezoneOffset()));
          } else {
            date = "";
          }
          return date;
        case "":
          return value;
        default:
          return value;
      }
    } else {
      return "";
    }
  };
  // const returningData = (value, type) => {
  //   if (value !== undefined && value !== null && value !== "") {
  //     switch (type) {
  //       case "Alphabet":
  //         var v = value
  //           ?.replace(/[^a-zA-Z ]/g, "")
  //           ?.replace(/^\s+/, "")
  //           ?.replace(/\s+/g, " ");
  //         v = v?.charAt(0).toUpperCase() + v.slice(1);
  //         return v;

  //       case "AlphaNumaric":
  //         var v = value
  //           ?.replace(/[^a-zA-Z0-9 ]/g, "")
  //           ?.replace(/^\s+/, "")
  //           ?.replace(/\s+/g, " ");
  //         v = v?.charAt(0).toUpperCase() + v.slice(1);
  //         return v;

  //       case "AlphabetsWithSpecial":
  //         var v = value
  //           ?.replace(/[^a-zA-Z\s!@#$%^&*(),.?":{}|<>]/g, "")
  //           ?.replace(/^\s+/, "")
  //           ?.replace(/\s+/g, " ");
  //         v = v?.charAt(0).toUpperCase() + v.slice(1);
  //         return v;

  //       case "Number":
  //         return value?.replace(/[^0-9\.]/g, "");

  //       case "Charge":
  //         return value?.replace(/^-?\d*\.?\d*$/g, "");

  //       // case "Decimal": return parseFloat(value?.replace(/[^0-9\.]/g, "")).toFixed(2);

  //       case "NumberString":
  //         return value?.replace(/[^0-9]/g, "");

  //       case "Phone":
  //         let res = value
  //           ?.replace("+91", "")
  //           ?.replace(/[^0-9]/g, "")
  //           ?.replace(/\s+/g, "");
  //         let l = res?.length;
  //         let r;
  //         if (l > 0 && l <= 5) {
  //           r = res?.toString()?.replace(/(\d{1,5})/, "+91 $1");
  //         } else if (l > 5 && l <= 10) {
  //           r = res?.toString()?.replace(/(\d{5})(\d{1,5})/, "+91 $1 $2");
  //         } else {
  //           r = "";
  //         }
  //         return r;

  //       case "Email":
  //         return value?.toLowerCase()?.replace(/\s+/g, "");

  //       case "NoSpace":
  //         var v = value?.replace(/^\s+/, "")?.replace(/\s+/g, " ");
  //         return v;
  // case "CapsAndNextLine":
  // let formatted = value
  //           ?.toLowerCase()
  //           ?.replace(/(^[a-z])|(\.\s*[a-z])|(\n[a-z])/g, (match) => match.toUpperCase());
  //         return formatted;
  //       case "Date":
  //         let date = "";
  //         if (value != null) {
  //           value?.setMinutes(0);
  //           value?.setHours(0);
  //           date = new Date(
  //             value?.setMinutes(
  //               value?.getTimezoneOffset() < 0 ? -value?.getTimezoneOffset() : value?.getTimezoneOffset()
  //             )
  //           );
  //         } else {
  //           date = "";
  //         }
  //         return date;

  //       default:
  //         return ""
  //     }
  //   } else {
  //     return "";
  //   }
  // };

  // const formChange = (type) => (e) => {
  //   let d;
  //   if (e?.target?.type == "radio") d = e.target.checked ? e.target.value : "";
  //   else if (e?.target?.type == "checkbox") {
  //     if (type == "Array")
  //       d = e.target.checked
  //         ? [...(data?.[e?.target?.name] || []), e.target.value]
  //         : data?.[e?.target?.name]?.filter((v) => v != e?.target?.value);
  //     else d = e.target.checked ? e.target.value : "";
  //   } else d = returningData(e?.target?.value || "", type);

  //   updateErrorsandData(e.target.name, d);
  // };
  const formChange =
    (type) =>
    (e, rawOverride = null) => {
      const name = e?.target?.name;

      if (e?.target?.type === "radio") {
        const d = e.target.checked ? e.target.value : "";
        updateErrorsandData(name, d);
        return;
      }

      if (e?.target?.type === "checkbox") {
        const checked = e.target.checked;
        let d;
        if (type === "Array") {
          d = checked ? [...(data?.[name] || []), e.target.value] : data?.[name]?.filter((v) => v !== e.target.value);
        } else {
          d = checked ? e.target.value : "";
        }
        updateErrorsandData(name, d);
        return;
      }

      const raw = rawOverride ?? (e?.target?.value || "");

      if (type === "CapsAndNextLine") {
        const el = e.target;
        const cursorStart = el.selectionStart;
        const beforeChange = data?.[name] || "";

        // Remove ^ and retain new lines
        let updatedRaw = raw.replace(/\^/g, "");

        // Add spacing and capitalize after periods and new lines
        const formatted = updatedRaw.replace(/\.([^\s])/g, ". $1").replace(/(^[a-z])|(\.\s*[a-z])|(\n[a-z])/g, (match) => match.toUpperCase());

        let newCursor = cursorStart;

        if (formatted !== beforeChange) {
          const lengthDiff = formatted.length - beforeChange.length;
          newCursor = cursorStart + lengthDiff;
        }

        const unchangedPrefixLength = (() => {
          for (let i = 0; i < formatted.length; i++) {
            if (formatted[i] !== raw[i]) return i;
          }
          return formatted.length;
        })();

        if (cursorStart <= unchangedPrefixLength) {
          newCursor = cursorStart;
        }

        updateErrorsandData(name, formatted);

        setTimeout(() => {
          const el = document.querySelector(`[name="${name}"]`);
          if (el?.setSelectionRange) {
            el.setSelectionRange(newCursor, newCursor);
          }
        }, 0);
      } else {
        const d = returningData(raw, type);
        updateErrorsandData(name, d);
      }
    };
  const formChanges = (key) => (e) => {
    let value = e.target.value;

    // Split by newline, trim each line, and add ^ at beginning if not already there
    const modified = value
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        return trimmed.startsWith("^") ? trimmed : "^" + trimmed;
      })
      .join("\n");

    setData((prev) => ({
      ...prev,
      [key]: modified,
    }));
  };

  const addItem = (key, item) => {
    let d = data[key] && data[key]?.length > 0 ? [...data?.[key], item || {}] : [item || {}];
    updateErrorsandData(key, d);
  };

  const removeItem = (key, index) => {
    let d = data[key]?.filter((v, i) => i != index);
    updateErrorsandData(key, d);
  };
  //  const addItemQuantity = (key, item) => {
  //   const exists = data[key]?.some((i) => i.serviceId === item.value);
  //   if (exists) return;

  //   const v = item;
  //   const newItem = {
  //     ...item,
  //     serviceId: v?.value,
  //     qty: 1,
  //     rate: parseFloat(v?.rate) || 0,
  //     totalAmount: parseFloat(v?.rate) || 0,
  //   };

  //   const d = data[key] && data[key]?.length > 0 ? [...data[key], newItem] : [newItem];
  //   updateErrorsandData(key, d);
  // };
  const addItemQuantity = (key, items) => {
    const existingItems = data[key] || [];

    // Normalize to array if it's a single object
    const itemList = Array.isArray(items) ? items : [items];

    const newItems = itemList.map((item) => ({
      ...item,
      serviceId: item?.value,
      qty: 1,
      rate: parseFloat(item?.rate) || 0,
      totalAmount: parseFloat(item?.rate) || 0,
    }));

    const combinedItems = [...existingItems];

    newItems.forEach((newItem) => {
      if (!combinedItems.some((e) => e.serviceId === newItem.serviceId)) {
        combinedItems.push(newItem);
      }
    });

    updateErrorsandData(key, combinedItems);
  };

  const onQuantityChange = (index, qty) => {
    const updated = data.services.map((item, i) => {
      if (i === index) {
        const newQty = parseInt(qty) || 1;
        const newTotal = (parseFloat(item?.rate) || 0) * newQty;
        return {
          ...item,
          qty: newQty,
          totalAmount: newTotal,
        };
      }
      return item;
    });
    updateErrorsandData("services", updated);
  };

  const writeData = (index, name, key, type) => (e) => {
    e.preventDefault();
    let d = returningData(e.target.value, type);
    if (name) {
      let fd = data[name];
      let present = fd[index];
      present[key] = d;
      fd[index] = present;
      updateErrorsandData(name, fd);
    }
  };

  const writeAddObject = (index, name, obj) => {
    if (name) {
      let fd = data[name];
      let present = fd[index];
      present = { ...present, ...obj };
      fd[index] = present;
      updateErrorsandData(name, fd);
    }
  };

  const writeDate = (index, name, key) => (e) => {
    let str;
    if (name) {
      if (e != null) {
        e?.setMinutes(0);
        e?.setHours(0);
        str = new Date(e?.setMinutes(e?.getTimezoneOffset() < 0 ? -e?.getTimezoneOffset() : e?.getTimezoneOffset() || 0));
      } else {
        str = "";
      }
      let fd = data[name];
      let present = fd[index];
      present[key] = str;
      fd[index] = present;
      updateErrorsandData(name, fd);
    }
  };

  const handleDateChange = (e, name) => {
    let str;
    if (name) {
      if (e != null) {
        e?.setMinutes(0);
        e?.setHours(0);
        str = new Date(e?.setMinutes(e?.getTimezoneOffset() < 0 ? -e?.getTimezoneOffset() : e?.getTimezoneOffset()));
      } else {
        str = "";
      }
      setData((p) => ({ ...p, [name]: str }));
      submittingData(name, str);
    }
  };

  const handleSubmit = () => {
    isSubmitted = true;
    validateForm();
    if (!hasErrors) {
      metadata.submit();
    }
  };

  const validateForm = () => {
    if (isSubmitted == true) {
      for (const key in metadata.validationSchema) {
        validateFormControl(key, data?.[key], data);
      }
      setErrors(newErrors);
      var size = Object.keys(newErrors).length;
      if (size) {
        hasErrors = true;
      } else {
        hasErrors = false;
      }
      newErrors = {};
    }
  };

  const submittingData = (name, value, d) => {
    if (isSubmitted) {
      validateFormControl(name, value, d || {});
      if (errors && errors[name] && !newErrors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        });
      } else {
        setErrors({
          ...errors,
          ...newErrors,
        });
      }
      newErrors = {};
    }
  };

  const validateInnerSchema = (parentKey, key, value) => {
    const schema = metadata.validationSchema;
    const validationFormControl = schema?.[parentKey]?.innerSchema?.[key];
    let innerErrors = {};
    if (validationFormControl?.required && !value) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.required?.message,
      };
    } else if (validationFormControl?.minlength && value.length < validationFormControl?.minlength?.value) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.minlength?.message,
      };
    } else if (validationFormControl?.maxlength && value.length > validationFormControl?.maxlength?.value) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.maxlength?.message,
      };
    } else if (validationFormControl?.pattern && !validationFormControl.pattern?.value?.test(value)) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.pattern?.message,
      };
    }
    return innerErrors;
  };

  const validateFormControl = (key, value, d) => {
    const schema = metadata.validationSchema;
    const validationFormControl = schema?.[key];
    if (validationFormControl?.required && !value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.required?.message,
      };
    } else if (value && validationFormControl?.minlength && value.length < validationFormControl?.minlength?.value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.minlength?.message,
      };
    } else if (value && validationFormControl?.maxlength && value.length > validationFormControl?.maxlength?.value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.maxlength?.message,
      };
    } else if (value && validationFormControl?.pattern && !validationFormControl.pattern?.value?.test(value)) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.pattern?.message,
      };
    } else if (validationFormControl?.isArray && validationFormControl?.isArray?.value) {
      console.log(d?.[key], "d?.[key]");
      if (d?.[key] && d?.[key]?.length > 0) {
        let res = d?.[key]?.map((e, i) => {
          let innerErrors = {};
          for (const innerkey in validationFormControl?.innerSchema) {
            let res = validateInnerSchema(key, innerkey, e?.[innerkey] || "");
            innerErrors = { ...innerErrors, ...res };
          }
          return innerErrors;
        });
        const allEmptyObjects = res.every((o) => Object.keys(o).length === 0);
        if (!allEmptyObjects) {
          newErrors = {
            ...newErrors,
            [key]: res,
          };
        }
      }
    }
  };
  const appendText = (fieldName, newText) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: `${prev?.[fieldName] || ""} ${newText}`.trim(),
    }));
  };

  const addItemorderby = (key, item) => {
    let d = data[key] && data[key]?.length > 0 ? [item, ...data?.[key]] : [item]; // Add new item at the beginning
    updateErrorsandData(key, d);
  };
  const handleCheckboxChange = (test) => {
    setData((prev) => ({
      ...prev,
      [test]: !prev[test],
    }));
  };
  const handleCheckboxChangeYES = (fieldName) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] === "Yes" ? "No" : "Yes",
    }));
  };
  // Add sub-row
  // Add sub-row
  const addSubRow = (mainIndex) => {
    setData((prev) => {
      const updatedMedication = [...prev.medication];
      const mainRow = { ...updatedMedication[mainIndex] };

      // Create new sub-row based on main row but reset values
      const newSubRow = {
        ...mainRow,
        quantity: "",
        dosageTime: [],
        frequencyLabel: "",
        frequencyValue: 0,
        duration: "",
        route: "",
        beforeAfterFood: "Before Food",
        instructions: "",
        patchCount: "",
        puffs: "",
        strengthPerPuff: "",
        // Keep identification properties
        medicineId: mainRow.medicineId,
        medicineName: mainRow.medicineName,
        dosageForm: mainRow.dosageForm,
      };

      // Initialize subRows array if needed
      if (!mainRow.subRows) mainRow.subRows = [];

      // Add new sub-row
      mainRow.subRows = [...mainRow.subRows, newSubRow];
      updatedMedication[mainIndex] = mainRow;

      return { ...prev, medication: updatedMedication };
    });
  };

  // Remove sub-row
  const removeSubRow = (mainIndex, subIndex) => {
    setData((prev) => {
      const updatedMedication = [...prev.medication];
      const mainRow = { ...updatedMedication[mainIndex] };

      if (mainRow.subRows && mainRow.subRows.length > subIndex) {
        mainRow.subRows = mainRow.subRows.filter((_, i) => i !== subIndex);
        updatedMedication[mainIndex] = mainRow;
      }

      return { ...prev, medication: updatedMedication };
    });
  };
  const setV = () => {
    setData({});
  };
  // Update function
  const writeAddObjectMedicine = (mainIndex, field, value, isSubRow = false, subIndex = -1) => {
    if (field !== "medication") return;

    setData((prev) => {
      const updated = [...prev[field]];

      if (isSubRow) {
        // Update sub-row
        const mainRow = { ...updated[mainIndex] };
        mainRow.subRows = [...(mainRow.subRows || [])];
        mainRow.subRows[subIndex] = value;
        updated[mainIndex] = mainRow;
      } else {
        // Update main row
        updated[mainIndex] = value;
      }

      return { ...prev, [field]: updated };
    });
  };
  return {
    data,
    errors,
    addObject,
    handleDateChange,
    handleChange,
    formChange,
    addItem,
    removeItem,
    resetFormData,
    writeData,
    writeDate,
    writeAddObject,
    resetData,
    onQuantityChange,
    addItemQuantity,
    handleSubmit,
    addItemorderby,
    handleCheckboxChange,
    appendText,
    handleCheckboxChangeYES,
    addSubRow,
    removeSubRow,
    writeAddObjectMedicine,
    setV,
  };
};
