export default interface InputFieldProps {
  icon: string;
  type: "test" | "email" | "password" | "phone";
  placeholder: string;
  errorMessage: string;
  required: boolean;
}
