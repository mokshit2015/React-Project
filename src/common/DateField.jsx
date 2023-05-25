import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateField = ({
  fieldName,
  control,
  Controller,
  dateFormat = "dd-MM-yyyy",
  defaultValue = new Date(),
  placeholderText = "Select Date",
  className,
  errors,
  validationObj = {},
}) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue || ""}
      name={fieldName}
      rules={{ ...validationObj }}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <>
          <DatePicker
            selected={new Date(value)}
            onChange={onChange}
            dateFormat={dateFormat}
            placeholderText={placeholderText}
            className={className}
          />
          <p className="py-2 text-danger">
            {errors[fieldName] && errors[fieldName].message}
          </p>
        </>
      )}
    />
  );
};

export default DateField;
