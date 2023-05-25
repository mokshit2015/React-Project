import React from "react";

const InputField = ({
  fieldId,
  fieldName,
  fieldLabel,
  fieldType,
  register,
  validationObj,
  placeholder,
  onChange,
  onBlur,
  className,
  errors,
  ref,
  children,
  multiple,
  required,
  disabled,
  value,
  onClick,
}) => {
  return (
    <>
      <input
        id={fieldId}
        name={fieldName}
        value={value}
        ref={ref}
        {...register(fieldName, validationObj)}
        onChange={onChange}
        type={fieldType}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className="flex flex-col">
        <div className="w-full">{children && children}</div>
        <div className="block w-full py-2 text-danger">
          {errors[fieldName] && errors[fieldName].message}
        </div>
      </div>
    </>
  );
};

export default InputField;
