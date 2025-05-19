export default interface InputFieldProps {
  icon?: "at" | "lock" | "mobile" | "email" | "user" | "website" | "phone";
  type: "text" | "email" | "password" | "phone";
  placeholder?: string;
  errorMessage?: string;
  required: boolean;
}
