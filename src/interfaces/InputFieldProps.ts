import React from "react";

export default interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  errorMessage?: string;
  required?: boolean;
}
