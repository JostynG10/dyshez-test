export default interface SignUpFormData {
  firstName: string;
  lastName: string;
  phone: string;
  secondaryPhone?: string;
  website?: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
