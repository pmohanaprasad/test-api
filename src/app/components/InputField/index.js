import React from "react";
import { Input } from "reactstrap";

const InputField = ({ type, placeholder, className, ...rest }) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        type={type}
        className={className}
        {...rest}
      />
      {/* {error && <div className="warning">{error.message}</div>} */}
    </>
  );
};

InputField.propTypes = {};

export default InputField;
