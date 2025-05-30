import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signUp } from "@actions/auth";
import type { FieldErrors } from "react-hook-form";
import type SignUpFormData from "@interfaces/SignUpFormData";

/**
 * Custom hook to handle the sign-up form.
 * Encapsulates validation logic, submission, field control, and error handling.
 */
export function useSignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  // Watch the values of password and confirmPassword fields
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  /**
   * Function executed on successful form submission.
   * Shows a loading toast, handles errors, and redirects after successful
   * registration.
   */
  const onSubmit = async (data: SignUpFormData) => {
    const toastId = toast.loading("Loading...");
    const { success, error } = await signUp(data);

    if (error) {
      toast.update(toastId, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    if (success) {
      toast.update(toastId, {
        render:
          "Registro exitoso, revisa tu correo para verificar tu cuenta.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      router.replace("?mode=signin");
    }
  };

  /**
   * Function executed if there are validation errors in the form.
   * Shows the first error message found.
   */
  const onError = (errors: FieldErrors<SignUpFormData>) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  // Returns the methods and states needed for the sign-up form
  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit, onError),
    Controller,
    control,
    watches: { passwordValue, confirmPasswordValue },
    formState: { errors, isSubmitting },
  };
}
