export default interface SignInFormData {
  name: string;
  lastName: string;
  mobile: string;
  phone?: string;
  website?: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
